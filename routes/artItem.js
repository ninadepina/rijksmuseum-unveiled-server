import express from 'express';
import { fetchDataIndividual, fetchRandomArt } from '../utils/fetch.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
	let randomArt;
	const { id } = req.params;
	res.cookie('artId', id);
	const language = req.cookies.language || 'en';
	const artData = await fetchDataIndividual(id, language);

	if (req.query['fetchRandomArt']) {
		randomArt = await fetchRandomArt(language);
	}

	randomArt = await fetchRandomArt(language);

	res.render('artItem', { css: ['views/detailView'], language, artData, randomArt, href: `/artItem/${id}` });
});

export default router;
