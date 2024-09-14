
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

        // Registrar a exclusão em um arquivo de log
        const logFilePath = path.join(__dirname, '../log/registerLog.txt');
        const logMessage = `Usuário deletado: ID: ${user.id}, Name: ${user.name}, Email: ${user.email} \n`;

        // Adicionando o log ao arquivo
        fs.appendFileSync(logFilePath, logMessage);

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro no servidor, tente novamente." });
    }
};
