import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import routes from './routes/routes.js';
import helpers from './utils/helpers.js';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => {
	res.setHeader('Cache-Control', 'max-age=365000000, immutable');
	next();
});

app.engine(
	'hbs',
	engine({
		layoutsDir: `${path.join(__dirname)}/views`,
		partialsDir: `${path.join(__dirname)}/views/partials`,
		defaultLayout: 'main',
		extname: '.hbs',
		helpers: { ...helpers }
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

// language cookie
app.post('/language', (req, res) => {
	const language = req.body.language || 'en';
	res.cookie('language', language);
	res.redirect('/');
});

// routes
routes.forEach((route) => {
	app.use(route.path, route.view);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
