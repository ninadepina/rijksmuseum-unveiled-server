import express from 'express';
import { fetchRandomArt, fetchColorData } from '../utils/fetch.js';
const router = express.Router();

router.get('/', async (req, res) => {
	let randomArt;
	const color = req.query.color;
	const language = req.cookies.language || 'en';

	if (req.query['fetchRandomArt']) {
		randomArt = await fetchRandomArt(language);
	}

	randomArt = await fetchRandomArt(language);
	const colorData = await fetchColorData(color, language);

	res.render('colorfilter', {
		css: ['views/colorFilterView', 'views/normalView'],
		js: ['fetchRandomArt'],
		language,
		randomArt,
		colorData
	});
});

export default router;
