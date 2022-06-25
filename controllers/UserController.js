const User = require('../models/UserModel');
const argon2 = require('argon2');
const crypto = require('crypto'); //Default Node JS package; used to generate toekn for password-reset, etc.

//Password is 'aa' for all as of 23 June 2022
exports.getRegisterPage = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn ? req.session.isLoggedIn : false;
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
    User.find({$or: [{TUM_Email: emailId}, {TUM_MobileNo: phoneNo}] })
        .then(result => {
           
            if(result.length != 0) {
                //console.log(result);
                // console.log("Inside UserController -> registerUser")
                // console.log("User exists");
                req.flash('error','User already exists. Please login');
                return res.redirect('/user/login');
            } else {
                    argon2.hash(confirm_password)
                        .then(hashedPassword => {
                            const user = new User({TUM_FirstName:firstName, TUM_LastName:lastName, TUM_Email:emailId, TUM_MobileNo:phoneNo, TUM_Password:hashedPassword,TUM_Role:'customer'});
                            user.save()
                            .then(() => {
                                console.log("Inside UserController -> registerUser")
                                console.log("User is successfully registered");
                            })
                            .catch(err => {
                                //console.log("Inside UserController.js");
                                console.log(err);
                            });
                        })
                        .catch(err => {
                            //console.log("Inside UserController.js");
                            console.log(err);
                        });
                   
        
            }
        })
        .catch(err => {
            console.log(err);
        })
    
}


exports.getLoginPage = (req, res, next) => {
    let message = req.flash('error').length > 0 ? req.flash('error')[0] : '' ;
    // console.log(req.flash('error'));
    // console.log(message);
    res.render('registerandauth/login-user.ejs', { pageTitle: "Login User", errorMessage: message });
};



exports.loginUser = (req, res, next) => {
    req.session.isLoggedIn = true;
    const userId = req.body.username;
    const password = req.body.password;
    User.findOne({$or: [{TUM_Email:userId},{TUM_MobileNo:userId}]})
        .then(result => {
            if( !result ) {
                req.flash('error','No User Found');
                return res.redirect('/user/login');
                // console.log("Inside UserController -> loginUser");
                // console.log("No User Found");
            } else {
                argon2.verify(result.TUM_Password, password)
                    .then(doMatch => {
                        // console.log("Inside UserController -> loginUser");
                        // console.log(doMatch);
                        if (doMatch) {
                            console.log("Inside UserController -> loginUser");
                            //console.log(req.session);
                            req.session.isLoggedIn = true;
                            req.session.user = result;
                            req.session.save(err => {
                                
                                if (err) {
                                    console.log("Inside UserController -> loginUser");
                                    console.log("Here");
                                    console.log(err);
                                }
                                res.redirect('/user/login');
                            });
                            
                        } else {
                            req.flash('error','Entered Password is wrong');
                            return res.redirect('/user/login');
                            // console.log("Inside UserController -> loginUser");
                            // console.log("Password do NOT match");
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    }); 
            }
        })
        .catch(err => {
            console.log(err);
        }); 
};


exports.logoutUser  = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log("Inside UserController -> logoutUser");
            
            console.log(err);
        }
        res.redirect('/user/login');  
    })
};


exports.getResetPassword = (req, res, next) => {
    let message = req.flash('error').length > 0 ? req.flash('error')[0] : '' ;
    const isLoggedIn = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.render('registerandauth/reset-password.ejs', { pageTitle: "Reset Password",isLoggedIn: isLoggedIn  , errorMessage: message });
};


exports.resetPassword = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            req.flash('error', "Some Server Error occured. Please try again");
            return res.redirect('/shop/reset-password');
        }
        const token = buffer.toString('hex');
    })
    const email = req.body.username;
    console.log(email);
    //Check if the email is registered.
};
