const express = require('express');

const logger = require('morgan');
const http = require('http');
const apiRouter = require('../routes/api/index');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }),
);

// Load middlewares

app.use(logger('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

// Routes
app.use('/api', apiRouter);

const httpServer = http.createServer(app);

httpServer.listen(5123, () => {
  console.log('HTTP Server running on port 5123');
});

module.exports = app;
