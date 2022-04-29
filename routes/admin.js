const express = require('express');
const path  = require('path');
const { domainToASCII } = require('url');
const router = express.Router();

const adminLogin = require('../controllers/AdminLoginController');

const productController = require('../controllers/ProductController');

const rootDir = require("../helpers/user-defined-path");

router.get('/', adminLogin.getLoginAdmin);
   
const pdt = [];
router.get('/add-product', productController.getAddProduct);


router.post('/add-product', productController.addProduct);

router.get('/list-product', productController.listAllProducts);


// module.exports = router;
exports.routes = router;
exports.products = pdt;