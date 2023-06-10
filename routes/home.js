import express from 'express';
import { fetchRandomArt } from '../utils/fetch.js';
const router = express.Router();

router.get('/', async (req, res) => {
	if (!req.cookies.language) res.cookie('language', 'en');
	if (req.cookies.resultCount) res.clearCookie('resultCount');
	if (req.cookies.userInput) res.clearCookie('userInput');

	const language = req.cookies.language || 'en';

	// let randomArt;
	// if (req.query['fetchRandomArt']) {
	// 	randomArt = await fetchRandomArt(language);
	// }

	const randomArt = await fetchRandomArt(language);

	res.render('home', {
		css: ['views/normalView'],
		js: ['autocomplete/autocomplete', 'fetchRandomArt'],
		language,
		randomArt
	});
});

export default router;
