const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Valor | Força de criptografia a ser usada

// Funções utilitárias de segurança

// Gerar um novo Token
const generateToken = (payload, secret, options) => {
    return jwt.sign(payload, secret, options);
};

// Verificar Token gerado anteriormente
const verifyToken = (token, secret, options) => {
    return jwt.verify(token, secret, options);
};

// Criptografar dados e senhas recebidas, antes de armazenar em algo
const hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
};

// Comparar Token e criptografia
const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports = {
    generateToken,
    verifyToken,
    hashPassword,
    comparePassword
};
