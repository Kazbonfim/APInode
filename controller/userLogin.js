const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Default para evitar erros se a variável não estiver definida

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se os campos estão presentes
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios." });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(404)
        .json({
          message: "Usuário não encontrado, tente novamente ou crie uma conta.",
        });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha inválida." });
    }

    const token = generateToken({ id: user.id }, JWT_SECRET, {
      expiresIn: "30m",
    });

    // Registrar a atualização em um arquivo de log
    const logFilePath = path.join(__dirname, "../log/userLogin.txt");
    const logMessage = `Usuário fez Login: Email: ${email}\n`;

    // Adicionando o log ao arquivo
    fs.appendFileSync(logFilePath, logMessage);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor, tente novamente." });
  }
};
