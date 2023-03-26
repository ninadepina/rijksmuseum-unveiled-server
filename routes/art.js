import express from 'express';
import { fetchData, fetchRandomArt } from '../utils/fetch.js';

const router = express.Router();

router.get('/', async (req, res) => {
	let randomArt;
    const resultCount = req.query.resultCount;
	const userInput = req.query.userInput;

	const artItem = await fetchData(userInput, resultCount);
	
	if (req.body['fetchRandomArt']) {
		randomArt = await fetchRandomArt();
	}
	
	randomArt = await fetchRandomArt();

	res.render('art', { css: ['views/normalView'], artItem, userInput, resultCount, randomArt });
});

export default router;