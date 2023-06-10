import express from 'express';
import { fetchData, fetchRandomArt } from '../utils/fetch.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const language = req.cookies.language || 'en';
	let resultCount = req.cookies.resultCount || req.query.resultCount;
	let userInput = req.cookies.userInput || req.query.userInput;

	if (req.query.resultCount) {
		resultCount = req.query.resultCount;
		res.cookie('resultCount', resultCount);
	}
	if (req.query.userInput) {
		userInput = req.query.userInput;
		res.cookie('userInput', userInput);
	}

	const artItem = await fetchData(userInput, resultCount, language);
	const randomArt = await fetchRandomArt(language);

	// prettier-ignore
	res.render('art', {
		css: ['views/normalView'],
		js: ['autocomplete/autocomplete', 'scrollIntoView'],
		language, artItem, userInput, resultCount, randomArt, href: '/art',
	});
});

export default router;
