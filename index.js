const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

/** Initialise enviornment variables */
require('dotenv').config();

/** Set Bodyparser for app */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.text({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

/** Set cores for app */
app.use(cors({ origin: '*' }));

/** Express application server  */
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
	console.log(`-----------------------------------------------------------------------------
                       Server is up on port ${port} 
-----------------------------------------------------------------------------`);
});
