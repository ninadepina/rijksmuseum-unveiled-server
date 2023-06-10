import express from 'express';
import { fetchRandomArt, fetchColorData } from '../utils/fetch.js';
const router = express.Router();
// prettier-ignore
const colorValues = ['000000', '737c84', 'b5bfcc', 'f6ecf3', 'dda5aa', 'f49b7a', 'df4c93', 'de4153', '981313', 'b35a1f', 'e09714', 'ffeb00', 'fbf6e1', 'e0cc91', '62ad77', '2f4f4f', '4279db', '8268dc', '4019b1', '850085'];

const getRandomColor = () => {
	const randomIndex = Math.floor(Math.random() * colorValues.length);
	return colorValues[randomIndex];
};

router.get('/', async (req, res) => {
	const color = req.query.color || getRandomColor();
	const language = req.cookies.language || 'en';

	const randomArt = await fetchRandomArt(language);
	const colorData = await fetchColorData(color, language);
	
	res.render('colorfilter', {
		css: ['views/colorFilterView', 'views/normalView'],
		language,
		randomArt,
		colorData,
		color,
		href: '/colorfilter'
	});
});

export default router;
