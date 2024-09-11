require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const auth = require('./middleware/auth');
const redisClient = require('./middleware/redis');

var app = express();

// Default
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// Rotas
// Pública - Cadastro & Login
const publicRoutes = require('./routes/public');

// Privado - Listar Usuários
const privateRoutes = require('./routes/private');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);

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
