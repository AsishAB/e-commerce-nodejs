const UserModel = require('../models/UserModel');
const Validation = require('../helpers/validation/validation');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secretJsonWebTokenKey = require('../helpers/secret-files-gitallow/jsonwebtoken-secret');

exports.signup = async(req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    // console.log(req.body);
    // return;
    const validationErrors = [];
    if  (Validation.blankValidation(email)) {
        validationErrors.push("Email cannot be blank");
        //return false;
    }
    if  (email && !Validation.checkEmailId(email)) {
        validationError.push("The Email Id format is not correct. Accepted Format - example@example.com");
    }
    if  (Validation.blankValidation(name)) {
        validationErrors.push("Name cannot be blank");
        //return false;
    }
    if  (Validation.blankValidation(password)) {
        validationErrors.push("Password cannot be blank");
        //return false;
    }
    


    if (validationErrors.length > 0 ) {
        //console.log(validationErrors.length)
        const error = new Error(validationErrors);
        error.statusCode = 422; //statusCode is User Defined
        throw error;
        
    }

    UserModel.findOne({email: email})
    .then(result => {
        if (result) {
            const error = new Error("Email Id already exists");
            error.statusCode = 422;
            next(error);
        }
    })
    .catch(err => {
        next(err);
    });
    try {
        const hashedPassword = await argon2.hash(password);
        //console.log(hashedPassword);
        const user = new UserModel({
            email: email,
            password: hashedPassword,
            name: name
        });
    
        await user.save()
        // .then(() => {
            res.status(201).json({response:"success" , message:"User Created Succesfully"})
        // })
        // .catch(err => {
        //     next(err);
        // })
    } catch(err) {
        next(err);
    }
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    // let userData; 
    let error ;
    UserModel.findOne({email: email})
        .then(userData => {
            if (!userData) {
                error  = new Error("No User Found");
                error.statusCode = 404;
                throw error;
            }
            
            argon2.verify(userData.password, password)
                .then(doMatch => {
                    return doMatch;
            
        })
        .then(result => {
            if (result) {
                const token = jwt.sign({
                                    email: userData.email, 
                                    userId: userData._id, 
                                    
                                } , secretJsonWebTokenKey, {expiresIn: '1h'});


                res.status(200)
                    .json({response:"success", messaeg: "Login Succesful", token:token, userId: userData._id.toString()});
                                
            } else {
                error = new Error("Password does not match as the one in the database");
                error.statusCode= 401;
                throw error; 
            }
        })
        .catch(err => {
            next(err);
        });
    })
};

exports.getStatus = async(req, res, next) => {
    const userId = req.userId;
    // console.log(userId);
    try {
        const user = await UserModel.findById(userId);
        return res.status(200).json({response: 'success', status: user.status});

    } catch(err) {
        next(err);
    }
};
   
        

