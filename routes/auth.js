const express = require('express');

const router = express.Router();


const userController = require('../controllers/UserController');

router.get('/login', userController.getLoginPage);

router.post('/loginUser', userController.loginUser);

router.post('/logout', userController.logoutUser);

router.get('/register', userController.getRegisterPage);

router.post('/register-user', userController.registerUser);

router.get('/reset-password', userController.getResetPassword);

router.post('/reset-password', userController.resetPassword);


exports.routes = router;