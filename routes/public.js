var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

// Cadastro
router.post('/cadastro', async (req, res) => {

    try {
        const user = req.body

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);

        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
            },
        })

        res.status(201).json(userDB); // Sucesso!
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro no servidor, tente novamente." });
    }
})

// Login
router.post('/login', async (req, res) => {

    try {
        const userInfo = req.body;

        const user = await prisma.user.findUnique({
            where: { email: userInfo.email, },
        })

        // res.status(200).json(user);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado, tente novamente ou crie uma conta." })
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Senha inválida." });
        }

        const token = jwt.sign({
            id: user.id,
        }, JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro no servidor, tente novamente" })
    }
})

module.exports = router;
