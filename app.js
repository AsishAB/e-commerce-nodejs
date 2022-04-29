
const express = require("express");

const bodyParser = require('body-parser');
const app = express();
const path = require("path");

const indexRoutes = require('./routes/index');
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const rootDir = require("./helpers/user-defined-path");
const htmlError = require('./controllers/HtmlErrorController');

app.use(bodyParser.urlencoded({extended:false}));

// app.set('views engine', 'pug');
    

app.set('views engine', 'ejs');
// app.set('views','views'); // All our HTML pages are in 'views' folder
app.set('views', [
    path.join(rootDir, 'views'),
    path.join(rootDir, 'views/admin'),
    path.join(rootDir, 'views/htmlerrors')


]);


app.use('/', indexRoutes);
app.use('/admin',adminData.routes);
app.use('/shop' ,shopRoutes);


app.use(express.static(path.join(__dirname, 'public'))); //express.static is used to serve static files like css or js files

app.use(htmlError.get404Page); //To display 404 page

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port} - http://localhost:${port}`)
});