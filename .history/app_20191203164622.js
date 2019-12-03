var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require("mysql");

var routes = require('./routes/index');
var users = require('./routes/users');
// var indexRouter = require('./routes/index');
// var homeRouter = require('./routes/home');
// var adminRouter = require('./routes/admin');
const validateToken = require('./util/util').validateToken;

var app = express();

app.use(cors())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "navajo-mapping"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  req.con = con;
  next();
});

app.use('/', routes);
app.use('/users', users);
// app.use('/home', homeRouter);
// app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.listen(8000, '0.0.0.0', function() {

  // print a message when the server starts listening
  console.log("Server starting on 8000");
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
