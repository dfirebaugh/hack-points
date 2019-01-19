'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');

const routes = require('./server/routes/routes.js');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');
const flash = require('express-flash');

require('dotenv').load();
require('./server/config/passport')(passport);
const mongoUri = process.env.MONGO_URI || 'mongodb://hack-points-db:27017/hackerpoints';

mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(flash());
app.use(helmet());
app.disable('x-powered-by');

app.use(
  session({
    secret: 'anything',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.options('*', cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app, passport, express);

http.createServer(app).listen(process.env.PORT);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
