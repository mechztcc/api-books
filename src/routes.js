const express = require('express');
const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');
const AuthController = require('./controllers/AuthController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/auth', AuthController.auth);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.post('/users/books', authMiddleware, BookController.store);
routes.get('/users/books', authMiddleware, BookController.index);
routes.delete('/users/books/:book_id', authMiddleware, BookController.delete);

module.exports = routes;
