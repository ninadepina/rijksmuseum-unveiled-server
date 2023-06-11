const CORE_CACHE_VERSION = 'v1';
const CORE_ASSETS = [
	'/',
	'/colorfilter',
	'/art',
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
		event.respondWith(
			fetch(event.request)
				.then((response) => {
					const clonedResponse = response.clone();
					caches.open(CORE_CACHE_VERSION).then((cache) => cache.put(event.request, clonedResponse));
					return response;
				})
				.catch(() => {
					return caches.open(CORE_CACHE_VERSION).then((cache) => cache.match(event.request));
				})
		);
	} else if (isHtmlGetRequest(event.request)) {
		// console.log('html get request', event.request.cook)
		event.respondWith(
			caches
				.open('html-cache')
				.then((cache) => cache.match(event.request.url))
				.then((response) => (response ? response : fetchAndCache(event.request, 'html-cache')))
				.catch(() => {
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

/**
 * Checks if a request is a GET and HTML request
 *
 * @param {Object} request        The request object
 * @returns {Boolean}            Boolean value indicating whether the request is a GET and HTML request
 */
function isHtmlGetRequest(request) {
	return (
		request.method === 'GET' &&
		request.headers.get('accept') !== null &&
		request.headers.get('accept').indexOf('text/html') > -1
	);
}

/**
 * Checks if a request is a core GET request
 *
 * @param {Object} request        The request object
 * @returns {Boolean}            Boolean value indicating whether the request is in the core mapping
 */
function isCoreGetRequest(request) {
	return request.method === 'GET' && CORE_ASSETS.includes(getPathName(request.url));
}

/**
 * Get a pathname from a full URL by stripping off domain
 *
 * @param {Object} requestUrl        The request object, e.g. https://www.mydomain.com/index.css
 * @returns {String}                Relative url to the domain, e.g. index.css
 */
function getPathName(requestUrl) {
	const url = new URL(requestUrl);
	return url.pathname;
}
