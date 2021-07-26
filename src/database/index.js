const Sequelize = require('sequelize');

const dbConfig = require('../config/database');
const User = require('../models/User');
const Book = require('../models/Book');

const connection = new Sequelize(dbConfig);
User.init(connection);
Book.init(connection);
Book.associate(connection.models);
User.associate(connection.models);

module.exports = connection;
