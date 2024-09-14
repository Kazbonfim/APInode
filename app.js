// Configuração de ambiente
require('dotenv').config();

// Módulos e dependências
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const auth = require('./middleware/auth');

// Instância do aplicativo
const app = express();

// Roteadores
const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');

// Configuração da view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/v1', publicRoutes);
app.use('/v1', auth, privateRoutes);

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
