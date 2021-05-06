var app = require('../index.js');
chai = require('chai');
request = require('supertest');
let should = chai.should();

/*
 * Test the /GET route
 */
describe('/GET product', () => {
	it('it should GET all the products', (done) => {
		request(app)
			.get('/api/v1/product')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});
