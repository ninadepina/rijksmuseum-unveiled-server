import express from 'express';
import { fetchRandomArt } from '../utils/fetch.js';
const router = express.Router();

router.get('/', async (req, res) => {
	if (!req.cookies.language) res.cookie('language', 'en');
	if (req.cookies.resultCount) res.clearCookie('resultCount');

	let randomArt;
	const language = req.cookies.language;

	if (req.body['fetchRandomArt']) {
		randomArt = await fetchRandomArt();
	}

	randomArt = await fetchRandomArt();

	res.render('home', { css: ['views/normalView'], js: ['autocomplete'], language, randomArt });
});

export default router;
