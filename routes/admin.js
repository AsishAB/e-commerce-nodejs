const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("<h1> Admin </h1> <p>Welcome</p>")
});

router.get('/add-product', (req, res, next) => {
    res.send("<h1> Add Product </h1>")
});

module.exports = router;