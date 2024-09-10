var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const auth = require('../middleware/auth');

router.get('/listar-usuarios', auth, async (req, res) => {

    try {

        const users = await prisma.user.findMany({
            select: {
                id: true, 
                name: true, 
                email: true,
                password: false,
            }
        });

        res.status(200).json({ message: "Usuários listados com sucesso: ", users })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro no servidor, tente novamente ou verifique seu login!" })
    }

})


module.exports = router;