// const server = require('./src/app.js');
// const { sequelize } = require('./src/db.js');
import app from './src/app';
import {sequelize} from './src/db'
import config from "./config"

// Syncing all the models at once.
sequelize.sync({ force: true }).then(() => {
	app.listen(config.port, () => {
		console.log(`%s listening at ${config.port}`); // eslint-disable-line no-console
	});
});
