// Dependências
const express = require('express');
const router = express.Router();
const { userLogin } = require('../controller/userLogin');
const { userRegister } = require('../controller/userRegister');

// Cadastro
router.post('/cadastro', userRegister);

// Login
router.post('/login', userLogin);

module.exports = router;
