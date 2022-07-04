const express = require('express');

const router = express.Router();

const path = require("path");

const rootDir = require('../helpers/user-defined-path');

const shopController = require('../controllers/ShopController');
const productController = require('../controllers/ProductController');
const cartController = require('../controllers/CartController');
const checkoutController = require('../controllers/CheckoutController');
const orderController = require('../controllers/OrderController');
const userController = require('../controllers/UserController');

const AuthMiddleware = require('../middlewares/AuthMiddleware');

 
router.get('/', shopController.getShopIndexPage);
router.get('/products', shopController.getAllProducts);
router.get('/product-detail/:id',  shopController.getProductDetail);


router.get('/cart', AuthMiddleware, cartController.getCart);
router.post('/addToCart',AuthMiddleware, cartController.addToCart);
router.post('/removeItemFromCart',AuthMiddleware, cartController.removeItemFromCart);


router.get('/checkout', AuthMiddleware,checkoutController.getCheckout);


router.post('/placeOrder', AuthMiddleware,orderController.placeOrder);
router.get('/order-confirmation',AuthMiddleware, orderController.getOrderConfirmation);
router.get('/orders',AuthMiddleware, orderController.getOrders);







module.exports = router;