import express from 'express';
import { fetchDataIndividual, fetchRandomArt } from '../utils/fetch.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
	let randomArt;
    const { id } = req.params;
	res.cookie('artId', id);
	const artData = await fetchDataIndividual(id);
	const language = req.cookies.language || 'en';

	if (req.body['fetchRandomArt']) {
		randomArt = await fetchRandomArt();
	}
	
	randomArt = await fetchRandomArt();

	res.render('artItem', { css: ['views/detailView'], language, artData, randomArt });
});

export default router;
