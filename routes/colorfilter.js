import express from 'express';
import { fetchRandomArt, fetchColorData } from '../utils/fetch.js';
const router = express.Router();

router.get('/', async (req, res) => {
	const color = req.query.color;
	const language = req.cookies.language || 'en';

	const randomArt = await fetchRandomArt(language);
	const colorData = await fetchColorData(color, language);

	res.render('colorfilter', {
		css: ['views/colorFilterView', 'views/normalView'],
		language, randomArt, colorData, href: '/colorfilter',
	});
});

export default router;
