const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {

    console.log(req);
    // const token = '';

};

module.exports = auth;