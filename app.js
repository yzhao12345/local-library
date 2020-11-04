var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var compression = require('compression');
var helmet = require('helmet');

//Set up mongoose connection
var mongoose = require('mongoose');
//var mongoDB = 'mongodb://yzhao12345:Rbs_0234@ds155651.mlab.com:55651/local_library_yzhao';
var mongoDB = process.env.MONGODB_URI || 'mongodb://yzhao12345:Rbs_0234@ds155651.mlab.com:55651/local_library_yzhao';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//link routing files!!
var index = require('./routes/index');
var users = require('./routes/users');
var wiki = require('./routes/wiki');
var catalog = require('./routes/catalog'); //Import routes for "catalog" area of site

// Create the Express application object
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // Add this after the bodyParser middlewares!
app.use(cookieParser());
app.use(compression()); //Compress all routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

//define URL pattern for index and users routers!!
app.use('/', index);
app.use('/users', users);
app.use('/wiki', wiki);
app.use('/catalog', catalog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
