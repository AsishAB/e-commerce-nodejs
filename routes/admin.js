const express = require('express');
const path  = require('path');
const { domainToASCII } = require('url');
const router = express.Router();

const rootDir = require("../helpers/user-defined-path");

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir , 'views', '/admin/login-admin.html'));
});
   
const pdt = [];
router.get('/add-product', (req, res, next) => {
    // res.sendFile('/views/add-product.html'); //This will mean that th efile will be searched in the Windos directory C:// ....
    // res.sendFile(path.join(__dirname, '..' , 'views', 'add-product.html')); //No "/" to be used, as we use "join"
    res.sendFile(path.join(rootDir , 'views', '/admin/add-product.html'));
});

router.post('/add-product', (req, res, next) => {
    pdt.push({title:req.body.title});
    console.log(pdt);
    res.redirect('/shop/list-product');
});

// module.exports = router;
exports.routes = router;
exports.products = pdt;