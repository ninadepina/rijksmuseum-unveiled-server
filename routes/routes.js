import home from '../routes/home.js';
import art from '../routes/art.js';
import artItem from '../routes/artItem.js';
import colorfilter from '../routes/colorfilter.js';
import offline from '../routes/offline.js';
import error from '../routes/error.js';

const routes = [
	{ path: '/', view: home },
	{ path: '/artItem', view: artItem },
	{ path: '/art', view: art },
	{ path: '/colorfilter', view: colorfilter },
	{ path: '/offline', view: offline },
	{ path: '*', view: error }
];

export default routes;
