const express = require('express');
const path = require("path");

const router = express.Router();

const indexController = require('../controllers/IndexController');

router.get('/', indexController.getIndex);

module.exports = router;

