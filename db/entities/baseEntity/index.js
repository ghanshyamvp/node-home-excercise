module.exports = {
	id: {
		primary: true,
		type: 'int',
		generated: true,
	},
	created_at: {
		type: 'timestamp',
		createDate: true,
	},
	updated_at: {
		type: 'timestamp',
		updateDate: true,
	},
	deleted_at: {
		type: 'timestamp',
		deleteDate: true,
	},
};
