import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
	res.render('home', { css: ['views/normalView'] });
});

export default router;