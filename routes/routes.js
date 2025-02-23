import home from '../routes/home.js';
import art from '../routes/art.js';
import artItem from '../routes/artItem.js';
import colorfilter from '../routes/colorfilter.js';
import language from '../routes/language.js';
import error from '../routes/error.js';

const routes = [
	{ path: '/language', handler: language },
	{ path: '/artItem', handler: artItem },
	{ path: '/art', handler: art },
	{ path: '/colorfilter', handler: colorfilter },
	{ path: '/', handler: home },
	{ path: '*', handler: error }
];

export default routes;
