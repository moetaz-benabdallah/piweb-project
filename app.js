var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var twig = require('twig');

var passport = require('passport');

var routes = require('./routes/index');
//var users = require('./routes/users');
var youtube = require('./routes/youtube');
var chaineDetails = require('./routes/chaineDetails');

var app = express();


//require('./routes/users')(app);

//require('./config/passport');

var server = require('http').Server(app);
var io = require('socket.io')(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(function(req, res, next){
    res.io = io;
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use('/', routes);
app.use('/users', require('./routes/users'));
app.use('/youtubeSearch', youtube);
app.use('/youtube', chaineDetails);
app.use('/videos', require('./routes/youtubeSearch'));
app.use('/grounds', require('./routes/grounds'));
app.use('/events', require('./routes/events'));
app.use('/sendMail', require('./routes/sendMail'));
app.use('/googleplus', require('./routes/googleAuthentication'));

app.use('/fbService', require('./routes/fbService'));
app.use('/games', require('./routes/gamesService'));

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = {app: app, server: server};
