const jwt = require("jsonwebtoken");
const redisClient = require('../middleware/redis'); // Certifique-se de que o caminho está correto

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    const token = req.headers.authorization;

    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Acesso negado" });
    }

    try {
        // Remove o prefixo 'Bearer ' se presente
        const tokenValue = token.replace('Bearer ', '');
        console.log('Token sem Bearer: ' + tokenValue);

        // Verifica se o token está no Redis
        const storedToken = await redisClient.get(`token:${jwt.decode(tokenValue).id}`);

        if (storedToken !== tokenValue) {
            return res.status(401).json({ message: "Token inválido!" });
        }

        const decoded = jwt.verify(tokenValue, JWT_SECRET);
        console.log(`Validando Token, transacional, e decodificando permissão...🚀`);

        // Atribui o ID do usuário ao req.userId
        req.userId = decoded.id;

    } catch (error) {
        console.log("Erro na validação do token:", error.message);
        return res.status(401).json({ message: "Token inválido!", error: error.message });
    }

    next();
};

module.exports = auth;
