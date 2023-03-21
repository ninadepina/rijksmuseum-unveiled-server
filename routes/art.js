import express from 'express';
import { fetchData } from '../utils/fetch.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const resultCount = req.query.resultCount;
	const userInput = req.query.userInput;

	const artItem = await fetchData(userInput, resultCount);

	res.render('art', { css: ['views/normalView'], artItem, userInput, resultCount });
});

export default router;