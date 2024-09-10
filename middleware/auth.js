const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {

    // https://www.youtube.com/watch?v=94FonmsT27s > 1:10:12
    console.log(req);
    const token = req.header.authorization;
    // const token = '';
    next();

};

module.exports = auth;