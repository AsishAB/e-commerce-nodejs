const express = require('express');

const router = express.Router();

const path = require("path");

const rootDir = require('../helpers/user-defined-path');

const shopController = require('../controllers/ShopController');
const productController = require('../controllers/ProductController');
const cartController = require('../controllers/CartController');
const checkoutController = require('../controllers/CheckoutController');
const orderController = require('../controllers/OrderController');

router.get('/', shopController.getShopIndexPage);

router.get('/products', shopController.getAllProducts);

router.get('/product-detail/:id', shopController.getProductDetail);

router.get('/cart', cartController.getCart);

router.post('/addToCart', cartController.addToCart);

router.post('/removeItemFromCart', cartController.removeItemFromCart);

router.get('/checkout', checkoutController.getCheckout);


router.post('/placeOrder', orderController.placeOrder);

router.get('/order-confirmation', orderController.getOrderConfirmation);

router.get('/orders', orderController.getOrders);




module.exports = router;