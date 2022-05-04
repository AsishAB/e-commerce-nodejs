const express = require('express');

const router = express.Router();

const path = require("path");

const rootDir = require('../helpers/user-defined-path');

const shopController = require('../controllers/ShopController');
const productController = require('../controllers/ProductController');
const cartController = require('../controllers/CartController');
const checkoutController = require('../controllers/CheckoutController');

router.get('/', shopController.getShopIndexPage);

router.get('/products', shopController.getAllProducts);

router.get('/products/:id', shopController.getProductDetail);

router.get('/cart', cartController.getCart);

router.get('/checkout', checkoutController.getCheckout);


module.exports = router;