const express = require('express');
const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');
const AuthController = require('./controllers/AuthController');
const authMiddleware = require('./middlewares/auth');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

routes.post(
  '/auth',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  AuthController.auth
);

routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UserController.store
);
routes.get('/users', UserController.index);

routes.post(
  '/users/books',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      url: Joi.string().required(),
    },
  }),
  authMiddleware,
  BookController.store
);
routes.get('/users/books', authMiddleware, BookController.index);
routes.delete('/users/books/:book_id', authMiddleware, BookController.delete);

module.exports = routes;
