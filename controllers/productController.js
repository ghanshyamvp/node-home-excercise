const { asyncHandler } = require('../middlewares/asyncHandler');
const ProductEntity = require('../db/entities/Product.entity.js');
const { throwError } = require('../utils/errorUtils.js');
const { getLatestExchangeRates } = require('../helpers/currencyHelpers.js');
const slugify = require('slugify');
const { getRepository } = require('typeorm');

const queryFilters = [
	'product.product_name AS product_name',
	'product.id AS id',
	'product.created_at AS created_at',
	'product.updated_at AS updated_at',
	'product.view_count AS view_count',
];

/** Get all product controller function */
module.exports.getAllProductCtrl = asyncHandler(async (req, res, next) => {
	//find all product
	const product = await getRepository(ProductEntity).find();

	res.status(200).json({
		succcess: true,
		data: product,
		message: 'Successfully fetched product data',
	});
});

/** Get single product controller function */
module.exports.getSingleProductCtrl = asyncHandler(async (req, res, next) => {
	/** currency converter */
	let currency = 1;

	if (req.query.currency && req.query.currency !== 'USD') {
		currency = await getLatestExchangeRates(req.query.currency);
	}

	//find single product
	const product = await getRepository(ProductEntity)
		.createQueryBuilder('product')
		.select(queryFilters)
		.addSelect(`(${currency} * product.price) AS price`)
		.where('product.id = :id', { id: req.params.id })
		.getRawOne();

	/** if product not found then throw error */
	if (!product) {
		next(throwError(404, 'Product not found in our records'));
	}

	/**Increase view count of product */
	await getRepository(ProductEntity).update(
		{ id: req.params.id },
		{
			view_count: product.view_count + 1,
		},
	);

	res.status(200).json({
		succcess: true,
		data: product,
		message: 'Successfully fetched product',
	});
});

/** Get most viewed product controller function */
module.exports.getMostViewedProductCtrl = asyncHandler(
	async (req, res, next) => {
		/** currency converter */
		let currency = 1;
		if (req.query.currency && req.query.currency !== 'USD') {
			currency = await getLatestExchangeRates(req.query.currency);
		}

		/** limit roduct */
		const limit = !isNaN(parseInt(req.query.limit))
			? parseInt(req.query.limit)
			: 5;

		/**find most viewed product */
		const product = await getRepository(ProductEntity)
			.createQueryBuilder('product')
			.select(queryFilters)
			.addSelect(`(${currency} * product.price) AS price`)
			.where('product.view_count > 0')
			.orderBy('product.view_count', 'DESC')
			.limit(limit)
			.getRawMany();

		res.status(200).json({
			succcess: true,
			data: product,
			message: 'Successfully fetched product',
		});
	},
);

/** Add product controller function */
module.exports.addProductCtrl = asyncHandler(async (req, res, next) => {
	const { product_name, price, description } = req.body;

	//save product
	const product = await getRepository(ProductEntity).save({
		product_name,
		price,
		description,
		slug:
			slugify(product_name, {
				replacement: '-',
				lower: false,
				strict: false,
			}) +
			'-' +
			Date.now(),
	});

	res.status(200).json({
		succcess: true,
		data: product,
		message: 'Product added successfully',
	});
});

/** Delete product controller function */
module.exports.deleteProductCtrl = asyncHandler(async (req, res, next) => {
	/**Find the product */
	const product = await getRepository(ProductEntity).findOne({
		where: {
			id: req.params.id,
		},
	});

	/** if product not found then throw error */
	if (!product) {
		return next(throwError(404, 'Product not found in our records'));
	}

	/** Delete product */
	await getRepository(ProductEntity).softDelete({
		id: req.params.id,
	});

	res.status(200).json({
		succcess: true,
		message: 'Product deleted successfully',
	});
});
