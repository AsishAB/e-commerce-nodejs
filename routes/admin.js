const express = require('express');
const path  = require('path');
const router = express.Router();

const rootDir = require("../helpers/user-defined-path");

router.get('/', (req, res, next) => {
    // res.sendFile('/views/add-product.html'); //This will mean that th efile will be searched in the Windos directory C:// ....
    // res.sendFile(path.join(__dirname, '..' , 'views', 'add-product.html')); //No "/" to be used, as we use "join"
    res.sendFile(path.join(rootDir , 'views', 'add-product.html'));
});

router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')); //This is ALSO Correct ../ or ..
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

module.exports = router;