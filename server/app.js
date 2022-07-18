const express = require('express');
const app = express();
const cors = require('cors');
const { middleware } = require('./utils');
const { contactsRouter, blogsRouter } = require('./controllers');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

// ** contactsRouter
app.use('/api/contacts', contactsRouter);
app.use('/api/blogs', blogsRouter);
// ** Order matters for routes
app.use(middleware.unknownEndpoint);
// ** last loaded middleware - error handler
app.use(middleware.errorHandler);

module.exports = app;
