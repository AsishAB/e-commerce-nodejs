const express = require('express');
const path  = require('path');

const router = express.Router();

const adminLogin = require('../controllers/AdminLoginController');
const productController = require('../controllers/ProductController');


const AuthMiddleware = require('../middlewares/AuthMiddleware');
const MulterMiddleware =  require('../middlewares/MulterMiddleware');

const uploads = MulterMiddleware("products");

const rootDir = require("../helpers/user-defined-path");

router.get('/', adminLogin.getLoginAdmin);


router.get('/add-product', AuthMiddleware ,  productController.getAddProduct);
router.post('/add-product', AuthMiddleware ,MulterMiddleware("products"), productController.addProduct);
router.get('/product-list', AuthMiddleware , productController.getProductListAdmin);
router.get('/edit-product/:id',  AuthMiddleware ,MulterMiddleware("products"),productController.getAddProduct); //Add and Edit in the same function
// router.post('/delete-product',  AuthMiddleware ,productController.deleteProduct); // While NOT using Ajax

router.delete('/delete-product/:productId',  AuthMiddleware ,productController.deleteProduct);  // While using Ajax

exports.routes = router;
