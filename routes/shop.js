const express = require('express');

const router = express.Router();


router.get('/add-product-shop', (req, res, next) => {
    res.send("<h1> Add Product Shop</h1>")
});

module.exports = router;