import express from 'express';
import { fetchRandomArt, fetchColorData } from '../utils/fetch.js';
const router = express.Router();

router.get('/', async (req, res) => {
	let randomArt;
	const color = req.query.color;

	if (req.body['fetchRandomArt']) {
		randomArt = await fetchRandomArt();
	}
	
	randomArt = await fetchRandomArt();
	const colorData = await fetchColorData(color);

	res.render('colorfilter', { css: ['views/colorFilterView', 'views/normalView'], randomArt, colorData });
});

export default router;