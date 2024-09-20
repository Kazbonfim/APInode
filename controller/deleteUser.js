const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

exports.deleteUser = async (req, res) => {
  console.log(
    "Recebendo requisição para deletar o usuário com ID:",
    req.params.id
  );

  try {
    // Buscar o usuário antes de deletar para obter informações para o log
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    // Deletar o usuário
    await prisma.user.delete({
      where: { id: req.params.id },
    });

    // Registrar a exclusão em um arquivo de log
    const logFilePath = path.join(__dirname, "../log/deleteLog.txt");
    const logMessage = `Usuário deletado: ID: ${user.id}, Name: ${user.name}, Email: ${user.email} \n`;

    // Adicionando o log ao arquivo
    fs.appendFileSync(logFilePath, logMessage);

    // Retornar sucesso
    res.status(200).json({ message: "Dados deletados com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(400).json({ message: "Erro ao deletar dados🚫" });
  }
};
