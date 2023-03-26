import express from 'express';
import { fetchRandomArt } from '../utils/fetch.js';
const router = express.Router();

router.get('/', async (req, res) => {
	if (!req.cookies.language) res.cookie('language', 'en');
	if (req.cookies.resultCount) res.clearCookie('resultCount');
	if (req.cookies.userInput) res.clearCookie('userInput');

	const language = req.cookies.language;

	let randomArt;
	if (req.query['fetchRandomArt']) {
		randomArt = await fetchRandomArt();
	}

	randomArt = await fetchRandomArt();

	res.render('home', { css: ['views/normalView'], js: ['autocomplete/autocomplete'], language, randomArt });
});

export default router;
