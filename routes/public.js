var express = require('express');
var router = express.Router();

// Cadastro
router.post('/cadastro', (req, res) => {
    const user = req.body
    res.status(201).json(user); // Sucesso!
})

module.exports = router;
