const express = require('express');

const router = express.Router();

const path = require("path");

const rootDir = require('../helpers/user-defined-path');


router.get('/list-product', (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../' ,'views', 'shop.html')); //This is ALSO correct
    res.sendFile(path.join(__dirname, '..' ,'views', 'shop.html'));
});




module.exports = router;