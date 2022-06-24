const express = require('express');
const path  = require('path');

const router = express.Router();

const adminLogin = require('../controllers/AdminLoginController');

const productController = require('../controllers/ProductController');

const AuthMiddleware = require('../middlewares/AuthMiddleware');

const rootDir = require("../helpers/user-defined-path");

router.get('/', adminLogin.getLoginAdmin);
   

router.get('/add-product', AuthMiddleware , productController.getAddProduct);


router.post('/add-product', AuthMiddleware , productController.addProduct);

router.get('/product-list', AuthMiddleware , productController.getProductListAdmin);


// router.get('/edit-product/:id', productController.getEditProductAdmin);

router.get('/edit-product/:id',  AuthMiddleware ,productController.getAddProduct); //Add and Edit in the same function

router.post('/delete-product',  AuthMiddleware ,productController.deleteProduct);


// module.exports = router;
exports.routes = router;
// exports.products = pdt;