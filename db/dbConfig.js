const config = require('config');
const { createConnection } = require('typeorm');

const dbConfig = {
	type: 'mysql', // database
	host: config.get('database_host'), // database host
	port: config.get('database_port'), // database port
	database: config.get('database_name'), // database name
	username: config.get('database_username'), // database username
	password: config.get('database_password'), // database password
	autoLoadEntities: true,
	entities: [__dirname + '/entities/*.js'], // database entities
	migrations: [__dirname + '/migrations/*.js'], // database migrations
	cli: {
		migrationsDir: `db/migrations`, // migration directory
	},
	maxQueryExecutionTime: 100000, // max execution timei
	synchronize: true,
	logging: false,
};

module.exports = dbConfig;

/** Typeorm connection function with database */
module.exports.dbConnection = async function () {
	try {
		await createConnection(dbConfig); // connect database
		console.log(`-----------------------------------------------------------------------------
                   Database connection established 
-----------------------------------------------------------------------------`);
	} catch (error) {
		console.log(error);
		throw error;
	}
};
