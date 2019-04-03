var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var index = require('./routes/index');
var passport = require('passport');
const mongoose = require('./config/database');
var jwt = require('jsonwebtoken');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const env = require('dotenv').load();
var startTasks = require('./startTasks');

app.set('secretKey', process.env.JWT_SECRET );
startTasks.createFirstUserIfNotExists();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

app.use(passport.initialize());
app.use('/api', index)

app.use(function (err, req, res, next) {
  let errMessage = {};
  // set locals, only providing error in development
  errMessage.message = err.message;
  errMessage.error = req.app.get('env') === 'development' ? err : {};

  
  // render the error page
  errMessage.status = (err.status || 500);
  res.json(errMessage);
});

module.exports = app;