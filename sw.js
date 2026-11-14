// 앱 설치용: 화면(페이지)만 인터넷에서 먼저 받아 오고, 인터넷이 끊기면 저장해 둔 화면을 보여 줘요.
// 숙제·녹화 같은 데이터는 건드리지 않아요.
const CACHE = "sua-v5";
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.add("./"))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", e => {
  if (e.request.mode !== "navigate") return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put("./", copy)); return r; }).catch(() => caches.match("./")));
});
