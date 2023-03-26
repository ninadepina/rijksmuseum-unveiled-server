import express from 'express';
import { fetchRandomArt } from '../utils/fetch.js';
const router = express.Router();

router.get('/', async (req, res) => {
	let randomArt;
	const language = req.cookies.language || 'en';

	if (req.body['fetchRandomArt']) {
		randomArt = await fetchRandomArt();
	}

	randomArt = await fetchRandomArt();

	res.render('home', { css: ['views/normalView'], js: ['autocomplete'], language, randomArt });
});

export default router;
