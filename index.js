const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const routeV1 = require('./routes/v1');
const dbConfig = require('./db/dbConfig');
const { createConnection } = require('typeorm');

/** Route middleware fuction */
express.application.prefix = express.Router.prefix = function (
	path,
	configure,
) {
	const router = express.Router();
	this.use(path, router);
	configure(router);
	return router;
};

const app = express();

/** Initialise enviornment variables */
require('dotenv').config();

/** Set Bodyparser for app */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.text({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

/** Logger middleware */
app.use(morgan('dev'));

/** Set cores for app */
app.use(cors({ origin: '*' }));

/** V1 api routes */
app.prefix('/api/v1', routeV1);

/** Error middleware */
app.use(async (error, req, res, next) => {
	res.status(error.status || 500).send({
		sccess: false,
		errors: [
			{
				status: error.status || 500,
				message: error.message || "We'r sorry! unexpected error occurs",
			},
		],
	});
});

/** When any route not found */
app.use((req, res, next) => {
	res.status(404).send({
		success: false,
		message: 'Route not found',
	});
});

/** Typeorm connection function with database */
try {
	createConnection(dbConfig); // connect database
	console.log(`-----------------------------------------------------------------------------
		    Database connection established 
-----------------------------------------------------------------------------`);
} catch (error) {
	console.log(error);
	throw error;
}

/** Express application server  */
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
	console.log(`-----------------------------------------------------------------------------
                       Server is up on port ${port} 
-----------------------------------------------------------------------------`);
});

module.exports = app;
