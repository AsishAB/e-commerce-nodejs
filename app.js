
const express = require("express");

const bodyParser = require('body-parser');
const app = express();
const path = require("path");

const indexRoutes = require('./routes/index');
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./helpers/user-defined-path");
const htmlError = require('./controllers/HtmlErrorController');
const db = require('./helpers/database-mysql');
//const sequelize = require('./helpers/database-using-sequelize');




db.query("SELECT * FROM tbl_products").then(result => {
    // console.log(result[0]);
}).catch(err => {
    console.log("In app js- err ")
    console.log(err);
});


app.use(bodyParser.urlencoded({extended:false}));

// app.set('views engine', 'pug');
    

app.set('views engine', 'ejs');
// app.set('views','views'); // All our HTML pages are in 'views' folder
app.set('views', [
    path.join(rootDir, 'views'),
    path.join(rootDir, 'views/admin'),
    path.join(rootDir, 'views/htmlerrors'),
    path.join(rootDir, 'views/shop')



]);


app.use('/', indexRoutes);
app.use('/admin',adminData.routes);
app.use('/shop' ,shopRoutes);


app.use(express.static(path.join(__dirname, 'public'))); //express.static is used to serve static files like css or js files

app.use(htmlError.get404Page); //To display 404 page

// app.use( (req, res, next) => {
//     db.query("SELECT * FROM tbl_users WHERE TUM_Id = ? ", [1])
//         .then( ([rows]) => {
//             console.log("In app.js");
//             console.log(rows[0].TUM_Id);
//             req.users = rows[0].TUM_Id;
//             next();
//         })
//         .catch(err => {
//             console.log("In app.js");
//             console.log(err); 
//         });
// });

        
        


/*  sequelize.sync() is used to generate tables for all Sequelise objects (example- cart, product etc.) directly in the database */
// sequelize.sync()
//     .then(result => {
//         //console.log(result);
//     })
//     .catch(err => {
//         // console.log("Inside app.js");
//         // console.log(err);
//     });

  

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`E-Commerce app listening on port ${port} - http://localhost:${port}`)
});