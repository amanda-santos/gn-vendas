const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Product = require('../models/Product');
const Purchase = require('../models/Purchase');

const connection = new Sequelize(dbConfig);

Product.init(connection);
Purchase.init(connection);

module.exports = connection;