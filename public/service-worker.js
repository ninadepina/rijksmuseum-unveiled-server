const CORE_CACHE_VERSION = 'v1';
// prettier-ignore
const CORE_ASSETS = [
	'/',
    '/offline.html',
	'/font/PannoText-Normal.ttf',
	'/static/uploads/banner.png',
    '/static/uploads/favicon.ico',
	'/manifest.json'
];

self.addEventListener('install', (e) => {
	console.log('installing');

	e.waitUntil(
		caches.open(CORE_CACHE_VERSION).then(function (cache) {
			console.log('opened cache');
			return cache.addAll(CORE_ASSETS);
		})
	);
});

self.addEventListener('activate', (e) => {
	console.log('activating');
	e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
	console.log('fetch event: ', e.request.url);

	// skip caching for non-HTTP/HTTPS resources
	if (!/^https?:\/\//i.test(e.request.url)) {
		console.log('skipping caching for non-HTTP/HTTPS resource');
		return fetch(e.request);
	}

	e.respondWith(
		fetch(e.request)
			.then((response) => {
				// only cache responses when the network is available
				if (response.status === 200 || response.type === 'opaque') {
					const responseClone = response.clone();
					caches.open(CORE_CACHE_VERSION).then((cache) => {
						cache.put(e.request, responseClone);
					});
				}
				return response;
			})
			.catch(() => {
				console.log('offline, fetching offline page');
				return caches.match('/offline.html');
			})
	);
});
