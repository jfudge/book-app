'use strict';

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const { applyMiddleware } = require('./utils');
const middleWare = require('./middleware');

const router = express();

const { router: userRoutes } = require('./routes/users/userRoutes');
const { router: bookRoutes } = require('./routes/books/bookRoutes');

const { URL, PORT } = require('./utils/constants');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

applyMiddleware(middleWare, router);

router.use('/api/users', userRoutes);
router.use('/api/books', bookRoutes);

const server = http.createServer(router);

mongoose
  .connect(URL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(async () => {
    console.log(`Connected to database at ${URL}`);
    server.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  })
