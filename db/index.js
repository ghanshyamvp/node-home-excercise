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
	maxQueryExecutionTime: 1000, // max execution timei
	synchronize: false,
	logging: false,
};

/** Typeorm connection function with database */
(async function dbConnection() {
	try {
		await createConnection(dbConfig); // connect database
		console.log(`-----------------------------------------------------------------------------
                   Database connection enstablished 
-----------------------------------------------------------------------------`);
	} catch (error) {
		console.log('/*====== Database connection lost ======*/: ', error);
		throw error;
	}
})();
