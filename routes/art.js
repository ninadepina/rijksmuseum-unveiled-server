import express from 'express';
import { fetchData, fetchRandomArt } from '../utils/fetch.js';

const router = express.Router();

router.get('/', async (req, res) => {
	let randomArt;
	let resultCount = req.cookies.resultCount || req.query.resultCount;
	const userInput = req.query.userInput;
  
	if (req.query.resultCount) {
	  resultCount = req.query.resultCount;
	  res.cookie('resultCount', resultCount);
	}

	const language = req.cookies.language || 'en';

	const artItem = await fetchData(userInput, resultCount);

	if (req.body['fetchRandomArt']) {
		randomArt = await fetchRandomArt();
	}

	randomArt = await fetchRandomArt();

	res.render('art', { css: ['views/normalView'], language, artItem, userInput, resultCount, randomArt });
});

export default router;
