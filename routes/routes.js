import home from '../routes/home.js';
import art from '../routes/art.js';
import artItem from '../routes/artItem.js';
import colorfilter from '../routes/colorfilter.js';
import error from '../routes/error.js';

const routes = [
	{ path: '/', view: home, viewName: 'normalView' },
	{ path: '/artItem', view: artItem, viewName: 'artItemView' },
	{ path: '/art', view: art, viewName: 'artView' },
	{ path: '/colorfilter', view: colorfilter, viewName: 'colorFilterView' },
    { path: '*', view: error, viewName: 'errorView' }
];

export default routes;