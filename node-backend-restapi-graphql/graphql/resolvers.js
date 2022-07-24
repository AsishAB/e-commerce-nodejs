const User = require('../models/UserModel');
const argon2 = require('argon2');
const validator = require('validator');

module.exports = {
    // createUser(args, req)  { const email = args.userInput.email;}  // Not using Destructuring {userInput} 

    //createUser:function({userInput}, req) // using Destructuring {userInput} 
    createUser: async function({userInput}, req) {    
        
        const email = userInput.email;
        const password = userInput.password;
        const name = userInput.name;
        
        const validationErrors = [];
        let error;

        if (validator.isEmpty(email)) {
            validationErrors.push("Email Id cannot be blank");
        }
        if (!validator.isEmail(email)) {
            validationErrors.push("Email Id must be of the form example@example.com");
        }
        if (validator.isEmpty(password)) {
            validationErrors.push("Password cannot be blank");
        }
        if (validator.isEmpty(name)) {
            validationErrors.push("Password cannot be blank");
        }

        if(validationErrors.length > 0 ) {
            error = new Error("Error in Input Fields");
            error.statusCode = 422;
            error.data = validationErrors;
            throw error;
        }
        
        const existingUser  = await User.findOne({email: email});

        if (existingUser) {
                error = new Error("User Already Exists");
                error.statusCode = 400;
                throw error;
        }
        try {
            const hashedPassword = await argon2.hash(password);
            //console.log(hashedPassword);
            const user = new User({
                email: email,
                password: hashedPassword,
                name: name
            });
        
            const createdUser = await user.save();
            return { ...createdUser._doc, _id: createdUser._id.toString() }
           
        } catch(err) {
            console.log(err);
        }
    }   
};