import express from 'express';
import { fetchDataIndividual } from '../utils/fetch.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
	const artData = await fetchDataIndividual(id);

	res.render('artItem', { css: ['views/detailView'], artData });
});

export default router;
