const express = require('express');

const logger = require('morgan');
const http = require('http');
const apiRouter = require('../routes/api/index');

const bodyParser = require('body-parser');

const app = express();

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

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`HTTP Server running on port ${process.env.PORT || 3000}`);
});

module.exports = app;
