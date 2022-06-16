const User = require('../models/UserModel');


exports.getRegisterPage = (req, res, next) => {
    
    res.render('registerandauth/register-user.ejs', { pageTitle: "Register New User" });
};


exports.registerUser = (req, res, next) => {
    //console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.emailId;
    const phoneNo = req.body.phoneNo;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    //console.log(firstName+" "+lastName+" "+emailId+" "+phoneNo+" "+password+" "+confirm_password);

    const user = new User({TUM_FirstName:firstName, TUM_LastName:lastName, TUM_Email:emailId, TUM_MobileNo:phoneNo, TUM_Password:confirm_password,TUM_Role:'customer'});

    user.save()
        .then(() => {
            // console.log("Inside UserController.js");
            // console.log(result);
        })
        .catch(err => {
            console.log("Inside UserController.js");
            console.log(err);
        });
        
}


exports.getLoginPage = (req, res, next) => {
    
    res.render('registerandauth/login-user.ejs', { pageTitle: "Login User" });
};



exports.loginUser = (req, res, next) => {
    req.session.isLoggedIn = true;
    const userId = req.body.username;
    const password = req.body.password;
    //console.log(userId + "----" + password);
    res.redirect('/user/login');
};


exports.logoutUser  = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/user/login');
    })
};

