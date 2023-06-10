import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
	const selectedLanguage = req.body.language;
	res.cookie('language', selectedLanguage);
	res.redirect('/');
});

export default router;
