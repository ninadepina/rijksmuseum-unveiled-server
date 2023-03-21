import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
	res.render('colorfilter', { css: ['views/colorFilterView'] });
});

export default router;