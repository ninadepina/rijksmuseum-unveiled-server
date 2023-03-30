const CORE_CACHE_VERSION = 'v1';
// prettier-ignore
const CORE_ASSETS = [
    '/',
    '/offline',
    '/styles/main.css',
    '/styles/views/normalView.css',
    '/favicon.ico'
];

self.addEventListener('install', (e) => {
	console.log('installing');

	e.waitUntil(
		caches.open(CORE_CACHE_VERSION).then(function (cache) {
			console.log('Opened cache');
			return cache.addAll(CORE_ASSETS);
		})
	);
});

self.addEventListener('activate', (e) => {
	console.log('activating');
	e.waitUntil(clients.claim());
});

// self.addEventListener('fetch', (e) => {
//     console.log('fetching');
//     e.respondWith(
//         caches.match(e.request).then(function (response) {
//             if (response) {
//                 return response;
//             }
//             return fetch(e.request);
//         }).catch(() => caches.match('/offline'))
//     );
// });
