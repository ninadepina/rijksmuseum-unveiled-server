const getCookieValue = (cookieName) => {
	// split the cookie string into an array of individual cookies
	const cookies = document.cookie.split(';');

	// loop through array of cookies and check each one's name
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		// yes cookie?, return its value
		if (cookie.startsWith(cookieName + '=')) {
			return cookie.substring(cookieName.length + 1);
		}
	}

	// no cookie?, return null
	return null;
};

const artIdValue = getCookieValue('artId');
const visitedArt = document.querySelector(`li:has(a[href="${artIdValue}"])`);

window.addEventListener('DOMContentLoaded', (e) => {
    const visitedArt = document.querySelector(`a[href="/artItem/${artIdValue}"]`);
    if (visitedArt) visitedArt.scrollIntoView({ block: 'end' });
});
