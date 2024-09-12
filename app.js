// Configuração de ambiente
require('dotenv').config();

// Módulos e dependências
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const auth = require('./middleware/auth');

// Instância do aplicativo
var app = express();

// Roteadores
var indexRouter = require('./routes/index');
const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');

// Configuração da view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Configuração de logging
const logFilePath = path.join(__dirname, 'access.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
app.use(logger('dev', { stream: logStream }));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/v1', indexRouter);
app.use('/v1', publicRoutes);
app.use('/v2', auth, privateRoutes);

// Tratamento de erros
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
