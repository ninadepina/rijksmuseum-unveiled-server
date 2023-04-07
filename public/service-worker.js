const CORE_CACHE_VERSION = 'v1';
const CORE_ASSETS = [
	'/',
	'/offline.html',
	'/static/PannoText-Normal.ttf',
	'/static/PannoText-NormalItalic.ttf',
	'/static/PannoText-Bold.ttf',
	'/static/index.css',
	'/static/uploads/banner.png',
	'/static/uploads/logoRijksmuseum.svg',
	'/static/uploads/collageVermeer.webp',
	'/static/uploads/favicon.ico',
	'/static/main.js',
	'/static/autocomplete/autocomplete.js',
	'/static/autocomplete/suggestions.js',
	'/static/getCookieValue.js',
	'/static/scrollIntoView.js',
	'/static/uploads/arrow-right.svg',
	'/static/uploads/instagram.svg',
	'/static/uploads/facebook.svg',
	'/static/uploads/twitter.svg',
	'/static/uploads/youtube.svg',
	'/static/uploads/tiktok.svg',
	'/static/uploads/linkedin.svg',
	'/static/uploads/gb.svg',
	'/static/uploads/ned.svg',
	'/static/uploads/icon-192x192.png',
	'/manifest.json'
];

self.addEventListener('install', (event) => {
	// console.log('installing');
	event.waitUntil(
		caches.open(CORE_CACHE_VERSION).then(function (cache) {
			return cache.addAll(CORE_ASSETS).then(() => self.skipWaiting());
		})
	);
});

self.addEventListener('activate', (event) => {
	// console.log('activating');
	event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
	// console.log('fetch event: ', event.request.url);
	if (isCoreGetRequest(event.request)) {
		// console.log('core get request: ', event.request.url);
		event.respondWith(caches.open(CORE_CACHE_VERSION).then((cache) => cache.match(event.request.url)));
	} else if (isHtmlGetRequest(event.request)) {
		// console.log('html get request', event.request.cook)
		event.respondWith(
			caches
				.open('html-cache')
				.then((cache) => cache.match(event.request.url))
				.then((response) => (response ? response : fetchAndCache(event.request, 'html-cache')))
				.catch((e) => {
					return caches.open(CORE_CACHE_VERSION).then((cache) => cache.match('/offline.html'));
				})
		);
	}
});

function fetchAndCache(request, cacheName) {
	return fetch(request).then((response) => {
		if (!response.ok) {
			throw new TypeError('Bad response status');
		}

		const clone = response.clone();
		caches.open(cacheName).then((cache) => cache.put(request, clone));
		return response;
	});
}

// function isHtmlGetRequest(request) {
// 	return (
// 		request.method === 'GET' &&
// 		request.headers.get('accept') !== null &&
// 		(request.headers.get('accept').indexOf('text/html') > -1 || request.url === self.location.origin + '/')
// 	);
// }
function isHtmlGetRequest(request) {
	// Check of de request een html pagina is
	return (
		request.method === 'GET' &&
		request.headers.get('accept') !== null &&
		request.headers.get('accept').indexOf('text/html') > -1
	); // Als de request een GET request is en de accept header een html pagina is, wordt true gereturned
}

function isCoreGetRequest(request) {
	return request.method === 'GET' && CORE_ASSETS.includes(getPathName(request.url));
}

function getPathName(requestUrl) {
	const url = new URL(requestUrl);
	return url.pathname;
}
