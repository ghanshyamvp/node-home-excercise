const productRoute = require('../productRoute')


module.exports = (app) => {

    app.prefix('/product', productRoute);

}