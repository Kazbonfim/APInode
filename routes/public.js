// Dependências
const express = require('express');
const router = express.Router();
const { hashPassword, comparePassword, generateToken } = require('../utils/config');
const { PrismaClient } = require('@prisma/client');

// Instância do Prisma
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; // Default para evitar erros se a variável não estiver definida

// Cadastro
router.post('/cadastro', async (req, res) => {
    try {
        const { email, name, password, position } = req.body; // Desestruturação do corpo da requisição
        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                position,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro no servidor, tente novamente." });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body; // Desestruturação do corpo da requisição
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado, tente novamente ou crie uma conta." });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Senha inválida." });
        }

        const token = generateToken({ id: user.id }, JWT_SECRET, { expiresIn: '30m' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro no servidor, tente novamente." });
    }
});

module.exports = router;
