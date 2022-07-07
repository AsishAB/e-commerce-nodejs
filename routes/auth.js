const express = require('express');

const router = express.Router();

const { check } =  require('express-validator/check');

const userController = require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/login', userController.getLoginPage);

router.post('/loginUser',  userController.loginUser);

router.post('/logout', AuthMiddleware , userController.logoutUser);

router.get('/register', userController.getRegisterPage);

router.post('/register-user', userController.registerUser);

router.get('/reset-password', userController.getResetPassword);

router.post('/reset-password', userController.resetPassword);

router.get('/update-password', userController.getUpdatePassword);

router.post('/update-password', userController.updatePassword);

exports.routes = router;