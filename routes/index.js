const express = require('express');
const path = require("path");

const router = express.Router();

const rootDir = require('../helpers/user-defined-path');

router.get('/', (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'index.pug'));
    res.render('index.ejs');
});

module.exports = router;

