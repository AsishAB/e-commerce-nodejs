const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.get('/getStatus',AuthMiddleware, UserController.getStatus); //Update Status not worked on

module.exports = router;