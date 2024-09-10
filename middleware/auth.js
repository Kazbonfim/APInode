const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {

    // https://www.youtube.com/watch?v=94FonmsT27s > 1:10:12
    const token = req.headers.authorization;
    console.log(token);
    

    if (!token) {
        console.log("Ops! 😭");
        
        return res.status(401).json({ message: "Acesso negado" })
    }

    try {

        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);

        req.userId = decoded.id;    

    } catch (error) {
        console.log(error + "😭");
        return res.status(401).json({ message: "Token inválido!" })
    }

    next();
};

module.exports = auth;