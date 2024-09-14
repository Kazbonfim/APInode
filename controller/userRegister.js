
const { hashPassword, comparePassword, generateToken } = require('../utils/config');
const { PrismaClient } = require('@prisma/client');

// Instância do Prisma
const prisma = new PrismaClient();

exports.userRegister = async (req, res) => {
    try {
        const { email, name, password, position } = req.body; // Desestruturação do corpo da requisição
        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                email, // @domain.com
                name, 
                password: hashedPassword,
                position, // Admin || User || Visitor
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro no servidor, tente novamente." });
    }
};
