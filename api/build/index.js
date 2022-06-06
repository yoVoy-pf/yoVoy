"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const server = require('./src/app.js');
// const { sequelize } = require('./src/db.js');
const app_1 = __importDefault(require("./src/app"));
const db_1 = require("./src/db");
const config_1 = __importDefault(require("./config"));
// Syncing all the models at once.
db_1.sequelize.sync({ force: true }).then(() => {
    app_1.default.listen(config_1.default.port, () => {
        console.log(`%s listening at ${config_1.default.port}`); // eslint-disable-line no-console
    });
});
