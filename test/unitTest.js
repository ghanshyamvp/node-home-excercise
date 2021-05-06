var app = require('../index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('POST /dogs', () => {
	it('should return status 200', async () => {
		let res = await chai.request(app).get('/api/v1/product');

		expect(res.status).to.equal(200);
	});
});
