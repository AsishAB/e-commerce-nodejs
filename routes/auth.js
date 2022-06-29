const express = require('express');

const router = express.Router();

const { check } =  require('express-validator/check');

const userController = require('../controllers/UserController');

router.get('/login', userController.getLoginPage);

router.post('/loginUser', check() , userController.loginUser);

router.post('/logout', userController.logoutUser);

router.get('/register', userController.getRegisterPage);

router.post('/register-user', check() , userController.registerUser);

router.get('/reset-password', userController.getResetPassword);

router.post('/reset-password', check() , userController.resetPassword);

router.get('/update-password', userController.getUpdatePassword);

router.post('/update-password', userController.updatePassword);

exports.routes = router;