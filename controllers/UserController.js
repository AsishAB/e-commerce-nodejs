const User = require('../models/UserModel');


exports.registerUser = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.emailId;
    const phoneNo = req.body.phoneNo;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

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