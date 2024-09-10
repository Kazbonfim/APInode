const jwt = require("jsonwebtoken");

// Chave secreta diretamente no código
const JWT_SECRET = '705958d8ffc36118cb4d0223a5b69c74df3f9a522185a97085f68ac22453a1bb'; 

const auth = (req, res, next) => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTA2NjVkNTUyMTEyZGM3ZDhjNGMzNyIsImlhdCI6MTcyNTk4MzMxNiwiZXhwIjoxNzI1OTg2OTE2fQ.TwSg_pSbBqVUdk13y2gzwCuu6TWnGUcBDBB-1n-zPI4';

    try {

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Token válido:', decoded);
        
    } catch (error) {
        console.error("Carolina, eu quero chorar 😭");
    }

};

auth();