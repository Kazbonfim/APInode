// Dependências
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

// Controladores
const { filterDatabase } = require('../controller/filterDatabase'); // [1]
const { updateUser } = require('../controller/updateUser'); // [2]
const { deleteUser } = require('../controller/deleteUser');

// Instância do Prisma
const prisma = new PrismaClient();

// Rotas
router.get('/database', filterDatabase); // [1]

router.put('/update/:id', updateUser);
 // [2]
router.delete('/delete/:id', deleteUser); // [2]

module.exports = router;
