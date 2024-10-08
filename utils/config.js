const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Criptografia de senhas, antes de enviar ao DB

// Funções utilitárias de segurança
const generateToken = (payload, secret, options) => {
    return jwt.sign(payload, secret, options);
};

const verifyToken = (token, secret, options) => {
    return jwt.verify(token, secret, options);
};

const hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
};

const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports = {
    generateToken,
    verifyToken,
    hashPassword,
    comparePassword
};
