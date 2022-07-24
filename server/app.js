const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const { middleware } = require('./utils');
const {
  loginRouter,
  usersRouter,
  blogsRouter,
  contactsRouter,
} = require('./controllers');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/blogs', blogsRouter);

// ** Order matters for routes
app.use(middleware.unknownEndpoint);
// ** last loaded middleware - error handler
app.use(middleware.errorHandler);

module.exports = app;
