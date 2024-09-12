const jwt = require("jsonwebtoken");
// const redisClient = require('../middleware/redis');

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Acesso negado" });
    }

    try {

        // Remove o prefixo 'Bearer ' se presente
        const tokenValue = token.replace('Bearer ', '');
        console.log('Token sem Bearer: ' + tokenValue);
        
        const decoded = jwt.verify(tokenValue, JWT_SECRET);
        
        // Atribui o ID do usuário ao req.userId
        req.userId = decoded.id;

    } catch (error) {
        console.log("Erro na validação do token:", error.message);
        return res.status(401).json({ message: "Token inválido!", error: error.message });
    }

    next();
};

module.exports = auth;