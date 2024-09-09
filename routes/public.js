var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client'); 

const prisma = new PrismaClient()
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

module.exports = router;
