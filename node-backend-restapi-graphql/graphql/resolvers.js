const User = require('../models/UserModel');
const argon2 = require('argon2');

module.exports = {
    // createUser(args, req)  { const email = args.userInput.email;}  // Not using Destructuring {userInput} 

    //createUser:function({userInput}, req) // using Destructuring {userInput} 
    createUser: async function({userInput}, req) {    
        
        const email = userInput.email;
        const password = userInput.password;
        const name = userInput.name;
        const existingUser  = await User.findOne({email: email});
        
        let error;
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