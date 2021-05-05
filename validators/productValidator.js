const { check } = require('express-validator');
const { baseValidator } = require('./baseValidator');
const { getRepository, Not } = require('typeorm');

/**
 * Add product - data validation
 */
exports.addProductVld = [
	check('product_name')
		.bail()
		.not()
		.isEmpty()
		.withMessage('Product name is required field'),
	check('price')
		.bail()
		.not()
		.isEmpty()
		.withMessage('Price is required field')
		.bail()
        .isFloat()
		.withMessage('Price must be float'),
	(req, res, next) => {
		baseValidator(req, res, next);
	},
];
