const CORE_CACHE_VERSION = 'v1';
// prettier-ignore
const CORE_ASSETS = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  'manifest.json'
];

self.addEventListener('install', (event) => {
	console.log('installing');

	event.waitUntil(
		caches.open(CORE_CACHE_VERSION).then(function (cache) {
			console.log('Opened cache');
			return cache.addAll(CORE_ASSETS);
		})
	);
});

self.addEventListener('activate', (event) => {
	console.log('activating');
	event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function (event) {
    console.log('fetching');
	event.respondWith(
		caches.match(event.request).then(function (response) {
			// Cache hit - return response
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
});
