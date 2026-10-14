/* NL Hợp Đồng — Service Worker
 * - Mở được app khi mất sóng (lưu sẵn trang + phông + biểu tượng).
 * - Có mạng: luôn lấy index.html mới nhất (quá 4 giây mạng yếu thì mở bản đã lưu, tải bản mới ngầm).
 * - Dữ liệu hồ sơ nằm trong IndexedDB của trình duyệt — service worker KHÔNG đụng tới.
 * Chỉ cần đổi CACHE khi sửa chính file này; cập nhật index.html không cần sửa gì ở đây.
 */
const CACHE = 'nl-hopdong-v1';
const SCOPE = self.registration.scope;               // https://.../ten-repo/
const INDEX = SCOPE;                                  // khoá lưu trang chính
const CORE = ['manifest.webmanifest', 'icon-192.png', 'icon-512.png'].map(f => new URL(f, SCOPE).href);
const CDN = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
const NAV_TIMEOUT = 4000;

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    try { const r = await fetch(INDEX, { cache: 'reload' }); if (r.ok) await c.put(INDEX, r); } catch (_) {}
    await Promise.all(CORE.map(u => fetch(u, { cache: 'reload' }).then(r => r.ok && c.put(u, r)).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(n => n.startsWith('nl-hopdong-') && n !== CACHE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

const wait = ms => new Promise(r => setTimeout(r, ms));

async function navigate(req) {
  const c = await caches.open(CACHE);
  const net = fetch(req, { cache: 'no-cache' }).then(async r => {
    if (r.ok) await c.put(INDEX, r.clone());
    return r;
  });
  const cached = await c.match(INDEX);
  if (!cached) { try { return await net; } catch (_) { return new Response('<h3 style="font-family:sans-serif">Không có mạng và chưa lưu sẵn ứng dụng. Hãy mở lại khi có mạng.</h3>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } }); } }
  const first = await Promise.race([net.then(r => r, () => null), wait(NAV_TIMEOUT).then(() => 'slow')]);
  if (first && first !== 'slow' && first.ok) return first;
  return cached;                                       // mất mạng / mạng chậm → mở bản đã lưu
}

async function staleWhileRevalidate(req) {
  const c = await caches.open(CACHE);
  const hit = await c.match(req);
  const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => hit);
  return hit || net;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate' && url.href.startsWith(SCOPE)) { e.respondWith(navigate(req)); return; }
  if (url.href.startsWith(SCOPE) && /\.(png|webmanifest)$/.test(url.pathname)) { e.respondWith(staleWhileRevalidate(req)); return; }
  if (CDN.includes(url.hostname)) { e.respondWith(staleWhileRevalidate(req)); return; }
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'CLEAR_PAGE') {
    e.waitUntil(caches.open(CACHE).then(c => c.delete(INDEX)));
  }
});
