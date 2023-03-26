import express from 'express';
import { fetchDataIndividual, fetchRandomArt } from '../utils/fetch.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
	let randomArt;
    const { id } = req.params;
	const artData = await fetchDataIndividual(id);

	if (req.body['fetchRandomArt']) {
		randomArt = await fetchRandomArt();
	}
	
	randomArt = await fetchRandomArt();

	res.render('artItem', { css: ['views/detailView'], artData, randomArt });
});

export default router;
