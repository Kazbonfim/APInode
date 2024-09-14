const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

exports.filterDatabase = async (req, res) => {
    try {
        // Log para verificar os query params recebidos
        console.log('Query Params:', req.query);

        // Preparar filtros com base nos query params
        const filters = {};

        if (req.query.name) filters.name = { contains: req.query.name, mode: 'insensitive' };
        if (req.query.email) filters.email = { contains: req.query.email, mode: 'insensitive' };
        if (req.query.id) filters.id = req.query.id; // Supondo que id seja uma string ou número exato
        if (req.query.position) filters.position = { contains: req.query.position, mode: 'insensitive' };

        // Buscar usuários com base nos filtros
        const search = await prisma.user.findMany({
            where: filters,
        });

        // Log para verificar o resultado da busca
        console.log('Resultado da Busca:', search);

        // Registrar a atualização em um arquivo de log
        const logFilePath = path.join(__dirname, '../log/searchLog.txt');
        const logMessage = `Usuário atualizado: ID: ${req.params.id}, Name: ${name}, Email: ${email}, Posição: ${position} \n`;

        // Adicionando o log ao arquivo
        fs.appendFileSync(logFilePath, logMessage);

        res.status(200).json({ message: "Usuários listados com sucesso", users: search });
    } catch (error) {
        // Log para verificar o erro
        console.error('Erro:', error);

        res.status(500).json({ message: "Ocorreu algum erro! Verifique sua busca e tente novamente" });
    }
};
