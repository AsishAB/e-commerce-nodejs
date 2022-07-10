
const express = require("express");

const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
// const multer = require('multer');

const indexRoutes = require('./routes/index');
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require('./models/UserModel');

const rootDir = require("./helpers/user-defined-path");
const htmlError = require('./controllers/HtmlErrorController');
const db = require('./helpers/database-mysql');
//const sequelize = require('./helpers/database-using-sequelize');

// const MongoConnect = require("./helpers/database-mongodb").MongoConnect;
const mongoURL = require('./helpers/secret-data/mongodb-using-mongoose');
const mongoose = require('mongoose');

const session = require('express-session');
const session_secret = require('./helpers/secret-files-gitallow/session-secret-code');
const MongoDBStore = require('connect-mongodb-session')(session);



const store = new MongoDBStore({
    uri: mongoURL,
    collection:"doc_sessions"
});

const csrf = require('csurf');
const csrfProtection = csrf();


// app.use(flash());

app.use(bodyParser.urlencoded({extended:false}));
// app.use()

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/public/my-uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// });
// app.use(multer({ storage: storage }).single('public/product_images'));

app.use(session({
        secret: session_secret, 
        resave: false, 
        saveUninitialized: false, 
        store: store,
        cookie: {
            maxAge: 720000
        }
    })
);
app.use(cookieParser());
app.use(csrfProtection);
app.use(flash());

// app.set('views engine', 'pug');
    

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn; // Used in all views (navigation.ejs)
    res.locals.csrfToken = req.csrfToken();
    next();
});


app.set('views engine', 'ejs');
// app.set('views','views'); // All our HTML pages are in 'views' folder
app.set('views', [
    path.join(rootDir, 'views'),
    path.join(rootDir, 'views/admin'),
    path.join(rootDir, 'views/htmlerrors'),
    path.join(rootDir, 'views/shop'),
    path.join(rootDir, 'views/registerandauth'),

]);

app.use((req, res, next) => {
    // throw new Error('Sync Dummy');
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        //console.log(user);
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
  });

app.use('/', indexRoutes);
app.use('/admin',adminData.routes);
app.use('/shop' ,shopRoutes);
app.use('/user' ,authRoutes.routes);


app.use(express.static(path.join(__dirname, 'public'))); //express.static is used to serve static files like css or js files
app.use('/product_images', express.static(path.join(__dirname, 'public/file_uploads/product_images')));
//app.use('/images', express.static('public/file_uploads/product_images'));

app.use(htmlError.get404Page); //To display 404 page
app.use('/500',htmlError.get500Page); //To display 404 page

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});



        
        


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



mongoose.connect(mongoURL)
    .then(result => {
        console.log(`E-Commerce app listening on port ${port} - http://localhost:${port}`);
        app.listen(port);
    })
    .catch(err => {
         console.log("Inside app.js, mongoose");
         console.log(err);
    });


/* ===================== To connect to Mongo without Mongoose and listen to server port ==================================== */

// MongoConnect((client) => {
//     // console.log("Inside app.js, MongoConnect");
//     // console.log(client);
//     app.listen(port, () => {
//         console.log(`E-Commerce app listening on port ${port} - http://localhost:${port}`)
//     });
// });


/* ===================== To listen to server port only ==================================== */
// app.listen(port, () => {
//             console.log(`E-Commerce app listening on port ${port} - http://localhost:${port}`)
// });
