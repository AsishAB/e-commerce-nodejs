
const express = require("express");

const bodyParser = require('body-parser');
const app = express();
const path = require("path");

const indexRoutes = require('./routes/index');
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const rootDir = require("./helpers/user-defined-path");

app.use(bodyParser.urlencoded({extended:false}));


app.use('/', indexRoutes);
app.use('/admin',adminData.routes);
app.use('/shop' ,shopRoutes);


app.use(express.static(path.join(__dirname, 'public'))); //express.static is used to serve static files like css or js files
app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404-error.html'));
    res.status(404).sendFile(path.join(rootDir, 'views', '/htmlerrors/404-error.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port} - http://localhost:${port}`)
});