const { EntitySchema } = require('typeorm');
const BaseEntity = require('./baseEntity');

module.exports = new EntitySchema({
	name: 'product',
	columns: {
		...BaseEntity,
		product_name: {
			type: 'varchar',
		},
		price: {
			type: 'float',
		},
		view_count: {
			type: 'int',
            default:0
		},
		slug: {
			type: 'varchar',
            unique:true
		},
		description: {
			type: 'text',
            nullable:true
		},
	},
});
