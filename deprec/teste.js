const jwt = require("jsonwebtoken");

// Chave secreta diretamente no código
const JWT_SECRET = 'TOKEN DE SEGURANÇA AQUI'; 

const auth = (req, res, next) => {

    const token = 'CHAVE GERADA COM TOKEN AQUI';

    try {

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Token válido:', decoded);
        
    } catch (error) {
        console.error("Cristo, eu quero chorar 😭");
    }

};

auth();