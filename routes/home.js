import express from 'express';
import { fetchRandomArt } from '../utils/fetch.js';
const router = express.Router();

router.get('/', async (req, res) => {
	let randomArt;

	if (req.body['fetchRandomArt']) {
		randomArt = await fetchRandomArt();
	}
	
	randomArt = await fetchRandomArt();

	res.render('home', { css: ['views/normalView'], js: ['autocomplete'], randomArt });
});

export default router;
