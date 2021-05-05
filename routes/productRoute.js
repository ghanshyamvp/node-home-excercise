const {
	addProductCtrl,
	getAllProductCtrl,
	getSingleProductCtrl,
	getMostViewedProductCtrl,
	deleteProductCtrl,
} = require('../controllers/productController');
const { addProductVld } = require('../validators/productValidator');

module.exports = (app) => {
	app.get('/', getAllProductCtrl);
	app.get('/most-viewed', getMostViewedProductCtrl);
	app.get('/:id', getSingleProductCtrl);
	app.post('/', addProductVld, addProductCtrl);
	app.delete('/:id', deleteProductCtrl);
};
