import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
	const language = req.cookies.language || 'en';

	res.render('offline', { css: ['views/normalView'], language });
});

export default router;