const User = require('../models/UserModel');
const ResetPassword = require('../models/ResetPasswordModel');
const argon2 = require('argon2');
const crypto = require('crypto'); //Default Node JS package; used to generate toekn for password-reset, etc.
const globalURL = require('../helpers/secret-files-gitallow/global-url');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const sendGridAPIKey = require('../helpers/secret-data/sendgrid_api');
const sendEMail = require('../helpers/secret-data/personal-email');
// console.log(sendEMail.sendFrom);

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key : sendGridAPIKey
    }
}));
        



//Password is 'as' for all as of 23 June 2022
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
                console.log("Inside UserController -> registerUser")
                console.log("User exists");
                req.flash('error','User already exists. Please login');
                return res.redirect('/user/login');
            } else {
                    argon2.hash(confirm_password)
                        .then(hashedPassword => {
                            const user = new User({TUM_FirstName:firstName, TUM_LastName:lastName, TUM_Email:emailId, TUM_MobileNo:phoneNo, TUM_Password:hashedPassword,TUM_Role:'customer'});
                            user.save()
                            .then(() => {
                                console.log("Inside UserController -> registerUser")
                                console.log("User has been successfully registered");
                                res.redirect('/user/login');
                                return transporter.sendMail({
                                    to: sendEMail.sendTo,
                                    from: "asish24in@gmail.com",
                                    subject: "Registration Successful",
                                    html: "<h1> Your Registration Is Succesful </h1>"
                                });
                                
                            })
                            .then(() => {
                                console.log("Inside UserController -> registerUser")
                                console.log("User has been successfully registered");
                                res.redirect('/user/login');
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
    //console.log(req.locals.isAuthenticateds);
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
                           // console.log("Inside UserController -> loginUser");
                            //console.log(req.session);
                            req.session.isLoggedIn = true;
                            req.session.user = result;
                            req.session.save(err => {
                                
                                if (err) {
                                    console.log("Inside UserController -> loginUser");
                                    
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
    //console.log(req.flash('error')[0]);
    let message = req.flash('error').length > 0 ? req.flash('error')[0] : '' ;
    const isLoggedIn = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.render('registerandauth/reset-password.ejs', { pageTitle: "Reset Password",isLoggedIn: isLoggedIn  , errorMessage: message });

};


exports.resetPassword = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            req.flash('error', "Some Server Error occured. Please try again");
            return res.redirect('/user/reset-password');
        }
        const token = buffer.toString('hex');
        const userId = req.body.username;
        User.findOne({$or: [{TUM_Email:userId},{TUM_MobileNo:userId}]})
            .then(result => {
                if (!result) {
                    req.flash('error', "No such user found in our database");
                    return res.redirect('/user/reset-password');
                }

                const resetPassword = new ResetPassword({
                    TRP_Registered_UserId: userId,
                    TRP_Token: token,
                    TRP_Token_ExpiresOn: Date.now(),
                    TRP_PasswordRequest_Date: Date.now()
                });
                resetPassword.save()
                    .then(() => {
                        let updatePasswordURL = `${globalURL}user/update-password?userId=${userId}&token=${token}`;
                        let passwordResetEmail = "<a href ="+updatePasswordURL+" class='btn btn-primary'> Click Here to Reset Your Password"+ "</a><br><h1>Token Expires On </h1><p>: " + Date.now() + "</p><br> <h1>Pasword Request for email id : </h1><p>" + userId  + "</p>";
                        res.redirect('/user/login');
                        return transporter.sendMail({
                            to: sendEMail.sendTo,
                            from: sendEMail.sendFrom,
                            subject: "Password Reset Email",
                            html: "<h1> " +  passwordResetEmail +  " </h1>"
                        });
                        
                        
                        //Send email 
                    })
                    .then(() => {
                        
                    })
                    .catch(err => {
                        console.log(err);
                    })

                
            });
    });
    

    
};

exports.getUpdatePassword = (req, res, next) => {
    let message = req.flash('error').length > 0 ? req.flash('error')[0] : '' ;
    const isLoggedIn = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    const userId = req.query.userId;
    const token = req.query.token;
    const tokenObject = {
        userId:userId,
        token:token
    }
    // console.log(tokenObject);
    if ((userId == '' || userId == undefined) && (token == '' || token == undefined )) {
        req.flash('error', "Incorrect User Id or Token. Please follow the process again");
        return res.redirect('/user/reset-password');
    }
    res.render('registerandauth/update-password.ejs', { pageTitle: "Update Password",isLoggedIn: isLoggedIn  , errorMessage: message, tokenObject:tokenObject });

};


exports.updatePassword = (req, res, next) => {
    const userId = req.body.userId;
    const token = req.body.token;
    const new_password = req.body.new_password;
    const confirm_new_password = req.body.confirm_new_password;
    //console.log(req.body);
    User.findOne({$or: [{TUM_Email:userId},{TUM_MobileNo:userId}]})
        .then(result => {
            //console.log(result);
            if (!result) {
                req.flash('error', "No such user found in our database");
                //console.log("No such user found in our database");
                return res.redirect('/user/update-password');
            }
            ResetPassword.findOne({TRP_Registered_UserId : userId})
                .sort({TRP_PasswordRequest_Date : 'descending'})
                .then(passwordResult => {
                    console.log(passwordResult);
                    if(!passwordResult){
                        req.flash('error', "Error while resetting Password. Please try again");
                        //console.log("Error while resetting Password. Please try again");
                        return res.redirect('/user/reset-password');
                    }
                    if (token === passwordResult.TRP_Token)  {
                        argon2.hash(confirm_new_password)
                        .then(hashedPassword => {
                            User.findById(result._id)
                                .then(userResult => {
                                    //console.log("Inside UserController -> updatePassword");
                                    //console.log(userResult)
                                    userResult.TUM_Password = hashedPassword;
                                    userResult.save()
                                        .then(() => {
                                            ResetPassword.findByIdAndRemove(passwordResult._id);
                                            // console.log("Inside UserController -> updatePassword");
                                            // console.log("Password reset successfully");
                                            return res.redirect('/user/login');
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        }); 
                                })
                                .catch(err => {
                                    console.log(err);
                                }); 
                            //const user = new User({TUM_FirstName:firstName, TUM_LastName:lastName, TUM_Email:emailId, TUM_MobileNo:phoneNo, TUM_Password:hashedPassword,TUM_Role:'customer'});
                            // user.save()
                        });
                    } else {
                        req.flash('error', "Invalid Token");
                        return res.redirect('/user/update-password');
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        });

};