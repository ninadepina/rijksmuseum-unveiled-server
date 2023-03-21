import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
	res.render('error', {
		...res.locals,
		css: ['views/errorView'],
	});
});

export default router;