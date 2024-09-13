const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

exports.updateUser = async (req, res) => {

    console.log("Sucesso, " + JSON.stringify(req.body));
    // res.status(200).json({ "message": "Dados atualizados com sucesso!" });

    try {
        const { name, email, password, position } = req.body;
        const data = { name, email, position };

        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);
            data.password = hashPassword;
        }

        const user = await prisma.user.update({
            where: {
                id: req.params.id,
            },
            data
        });

        // Registrar a atualização em um arquivo de log
        const logFilePath = path.join(__dirname, '../log/updateLog.txt');
        const logMessage = `Usuário atualizado: ID: ${req.params.id}, Name: ${name}, Email: ${email}, Posição: ${position} \n`;

        // Adicionando o log ao arquivo
        fs.appendFileSync(logFilePath, logMessage);

        // Retornar sucesso
        res.status(200).json({ message: "Dados atualizados com sucesso!" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Erro ao atualizar dados🚫" });
    }
};
