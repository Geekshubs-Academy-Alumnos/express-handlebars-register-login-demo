var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var session = require('express-session');



var app = express();

require( './config/mongo.js' );
require( './config/nodemailer.js' );
var winston = require( './config/winston' );


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use( session( {
    // Clave con la que se va a firmar el ID de las cookies
    secret: '1234',
    // Nombre de la cookie
    name: 'register-demo',
    // Si se debe reguardar el objeto completo o no en cada petición.
    resave: true,
    // Si la sesión se debe guardar al crearla aunque no la modifiquemos.
    saveUninitialized: true
} ) );

app.use( logger( 'dev', { stream: winston.stream } ) );


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use('/files' , express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
