import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
	const language = req.cookies.language || 'en';

	res.render('error', {
		...res.locals,
		css: ['views/errorView'],
		language
	});
});

export default router;
