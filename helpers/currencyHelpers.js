const axios = require('axios');
const config = require('config');

module.exports.getLatestExchangeRates = async (currency) => {
	try {
		if (config.get('currency').includes(currency)) {
			const exchange_rates = await axios.get(
				'http://api.currencylayer.com/live?access_key=bdf100ba3257a36d876c147e8e6f9edd&source=USD&currencies=USD,CAD,EUR,GBP&format=1',
			);
			return exchange_rates.data.quotes[`USD${currency}`];
		} else {
			return 1;
		}
	} catch (err) {
		return 1;
	}
};
