import { getCookieValue } from './getCookieValue.js';

const artIdValue = getCookieValue('artId');

window.addEventListener('DOMContentLoaded', (e) => {
	const visitedArt = document.querySelector(`a[href="/artItem/${artIdValue}"]`);
	if (visitedArt) visitedArt.scrollIntoView({ block: 'end' });
	document.cookie = 'artId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
});
