// Dependências
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
// Controladores
const { updateUser } = require('../controller/updateUser'); //[1]

// Instância do Prisma
const prisma = new PrismaClient();

// Rotas
router.get('/database', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                position: true,
            }
        });

        console.log(users);
        res.status(200).json({ message: "Usuários listados com sucesso: ", users });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro no servidor, tente novamente ou verifique seu login!" });
    }
});

router.put('/update/:id', updateUser); // [1]

module.exports = router;
