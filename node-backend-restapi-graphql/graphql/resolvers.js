const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const argon2 = require('argon2');
const validator = require('validator');
const globalURL = require('../helpers/secret-files-gitallow/global-url');
const jwt = require('jsonwebtoken');
const secretJsonWebTokenKey = require('../helpers/secret-files-gitallow/jsonwebtoken-secret');
//req.isAuth is inside middlewares-> AuthMiddleware.js


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
    },
    
    login : async function({ email, password }, req) {
        const user = await User.findOne({email: email});
        let error;
        if (!user) {
            error = new Error("No User Found");
            error.statusCode = 404;
            throw error;
        }
        const doMatch = await argon2.verify(user.password, password);
        if (!doMatch) {
            error = new Error("Password is wrong!");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: user.email, 
            userId: user._id.toString(), 
            
        } , secretJsonWebTokenKey, {expiresIn: '1h'});

        return  { token: token, userId:user._id.toString() }
    },
    createPost: async function({ postInput }, req) {
        let error;
        //console.log(req.isAuth);
        //return;

        if (!req.isAuth) {
            error = new Error("Inside graphql -> resolvers.js -> createPost === Unauthenticated");
            error.statusCode = 401;
            throw error;
           
        }
        const title = postInput.title;
        const content = postInput.content;
        const image = postInput.image;
        
        const validationErrors = [];
        

        if (validator.isEmpty(title)) {
            validationErrors.push("Title cannot be blank");
        }
        
        if (validator.isEmpty(content)) {
            validationErrors.push("Content cannot be blank");
        }
        // if (validator.isEmpty(image)) {
        //     validationErrors.push("Image cannot be blank");
        // }

        if(validationErrors.length > 0 ) {
            error = new Error("Error in Input Fields");
            error.statusCode = 422;
            error.data = validationErrors;
            throw error;
        }
        const user = await User.findById(req.userId);
        if (!user) {
            error = new Error("Invalid User");
            error.statusCode = 404;
            throw error;
        }
        const newPost = await new Post({
            title: title,
            content: content,
            imageURL: image,
            creator: user

        });
        const postResult = await newPost.save();
        user.posts.push(postResult);
        const userResult = await user.save();
        // console.log(newPost);
        // return;
        return {
            ...newPost._doc, 
            _id: newPost._id.toString(), 
            //createdAt: newPost.createdAt.toISOString(),
            //updatedAt: newPost.updatedAt.toISOString()
        
        }
        
    },
    getPosts: async function({paginator}, req) {
        let error;
        
        if (!req.isAuth) {
            error = new Error("Inside graphql -> resolvers.js -> getPosts === Unauthenticated");
            error.statusCode = 401;
            throw error;
        }
        const userId = req.userId;
        if (!userId) {
            error = new Error("Inside graphql -> resolvers.js -> getPosts === No User Found");
            error.statusCode = 401;
            throw error;
        }

        if (!paginator) {
            paginator = 1;
        }
        const perPage = 2;
        const totalPosts = await Post.find({creator: userId}).countDocuments();
        const posts = await Post.find({creator: userId}).sort({createdAt: -1}).populate('creator').skip((paginator - 1) * perPage).limit(perPage);
        const modifiedPosts = posts.map(p => {
            return {...p._doc, _id: p._id.toString(), createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString()  }
        });
        //console.log(modifiedPosts);return;
        return { posts: modifiedPosts, totalPost: totalPosts }
    },

    getPostById: async function({ postId }, req) {
        let error;
        
        if (!req.isAuth) {
            error = new Error("Inside graphql -> resolvers.js -> getPostById === Unauthenticated");
            error.statusCode = 401;
            throw error;
        }
        const userId = req.userId;
        if (!userId) {
            error = new Error("Inside graphql -> resolvers.js -> getPostById === No User Found");
            error.statusCode = 401;
            throw error;
        }
        const post = await Post.findById(postId).populate('creator');
        const user = await User.findById(userId);
        // console.log(post);
        // return;
        if (!post) {
            error = new Error("Inside graphql -> resolvers.js -> getPostById === Post Not Found");
            error.statusCode = 400;
            throw error;
        }
        if ( post.creator._id.toString() !== user._id.toString() ) {
            error = new Error("Inside graphql -> resolvers.js -> getPostById === Unauthorised. Users do not match");
            error.statusCode = 401;
            throw error;
        }
        post.imageURL = globalURL + post.imageURL;

        return { ...post._doc, _id: post._id.toString(), createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() };
    },
};