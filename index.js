import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', engine());
app.engine(
	'hbs',
	engine({
		layoutsDir: `${path.join(__dirname)}/views`,
		partialsDir: `${path.join(__dirname)}/views/partials`,
		defaultLayout: 'main',
		extname: '.hbs'
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
	res.render('home', { title: 'Home' });
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
