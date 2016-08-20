var express = require('express');
var app = express();

var routes = require('./routes/index');

app.use('/', routes);

module.exports = app;
