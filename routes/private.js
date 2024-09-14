// Dependências
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
// Controladores
const { filterDatabase } = require('../controller/filterDatabase'); // [1]
const { updateUser } = require('../controller/updateUser'); // [2]

// Instância do Prisma
const prisma = new PrismaClient();

// Rotas
router.get('/database', filterDatabase); // [1]

router.put('/update/:id', updateUser); // [2]

module.exports = router;
