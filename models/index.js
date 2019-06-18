'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const slave_database = {};

let sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: config.dialect,
	port: "3306",
	sync: { force: false },
	pool: { maxConnections: 5, maxIdleTime: 30 }
  });


fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		const model = sequelize['import'](path.join(__dirname, file));
		slave_database[model.name] = model;
	});

Object.keys(slave_database).forEach(modelName => {
	if (slave_database[modelName].associate) {
		slave_database[modelName].associate(slave_database);
	}
});

slave_database.Sequelize = Sequelize;
this.slave_database  = slave_database;
