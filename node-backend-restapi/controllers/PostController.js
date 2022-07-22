const PostModel = require('../models/PostModel');
const Validation = require('../helpers/validation/validation');
const globalURL = require('../helpers/secret-files-gitallow/global-url');
const HelperClass = require('../helpers/helper_functions/helper');
const UserModel = require('../models/UserModel');
const io = require('../socket');


exports.getPosts = (req, res, next) => {
    // console.log(io.getIO());
    // return;
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    const userId = req.userId;
    PostModel.find({creator: userId})
    // PostModel.find()
        .countDocuments()
        .populate('creator')
        .then(count => {
            totalItems = count;
            // return PostModel.find()
            return PostModel.find({creator: userId})
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
        })
        .then(posts => {
            //console.log(posts);
            //return;
            res.status(200)
            .json({
                response:'success',
                posts:posts,
                totalItems: totalItems, //Required, as it is coded in React by Academind

            })
            // .json({
            //     response:'success',
            //     posts:posts
            // });
        
        })
        .catch(err => {
            next(err);
        })
    /* PostModel.find()
    .then(posts => {
        
        res.status(200).json({
            response:'success',
            posts:posts
        });
    })
    .catch(err => {
        next(err);
    })
    */
  
};

exports.addEditPost = async (req, res, next) => {
    const postId = req.params.postId ? req.params.postId : '';
    // console.log(req.body);
    // return;
    const title = req.body.title;
    const content = req.body.content;
    const imageURL = req.file;
    const userId = req.userId;

    let fileName = (imageURL) ? "post_images/" + imageURL.filename : '';
    
    const validationErrors = [];
    // console.log(req.file);
    // return;
    if  (Validation.blankValidation(title)) {
        validationErrors.push("Title cannot be blank");
        //return false;
    }
    
    
    if  (Validation.blankValidation(content)) {
        validationErrors.push("Content cannot be blank");
        //return false;
    }
    if  ((postId == '') && Validation.blankValidation(imageURL)) {
            validationErrors.push("Image URL cannot be blank");
        //return false;
    }

    if (validationErrors.length > 0 ) {
        //console.log(validationErrors.length)
        const error = new Error(validationErrors);
        error.statusCode = 422; //statusCode is User Defined
        throw error;
        
    }

    if (postId == '') {
        //Add new post
        const post = new PostModel({
            title: title,
            content: content,
            imageURL:fileName,
            creator: req.userId
        });
    
        try {
    
            const result = await post.save();
             //201 -> Indicates success and Resource created successfully;
            const user = await UserModel.findById(userId);
                user.posts.push(result);
                const resultUser = await user.save();
                io.getIO().emit('posts',{action: 'create', post: result})
                res.status(201).json({
                response: 'success',
                message: "Post Created Successfully",
                posts: result,
                creator : {
                    _id: user._id,
                    name: user.name
                }
            })
        }  catch (err) {
            next(err);
        }
    } else {
        // Edit a post
        // console.log(postId);
        // return;
        // console.log(req.body);
        // return;
        try {
            const post = await PostModel.findById(postId);
            
            if (!post) {
                const error = new Error("Post not found");
                error.statusCode = 404;
                throw error;
            }
            post.title = title;
            post.content = content;
            if (imageURL) {
                HelperClass.deleteFile(post.imageURL);
                post.imageURL = fileName //fileName stores the complete file name
            } else {
                post.imageURL = post.imageURL;
            }
            // console.log(post);
            // return;
            const result = await post.save();
            //console.log(result);
           // return;
            return res.status(201).json({response: "success", message: 'Post Edited Successfully'})

        } catch(err) {
            next(err);
        }
        
    }
    

   
};

exports.getPostById = async(req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;
    let error;
    try {
        const postData = await PostModel.findById(postId);
        if (userId.toString() != postData.creator.toString()) {
            error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }
        postData.imageURL = globalURL + postData.imageURL;
        if (!postData) {
            error = new Error("No Post Found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({response: 'success', message:"Post Found", post: postData});
    } catch (err) {
        next(err);
    }

};

exports.deletePost = async(req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;
    const post = await PostModel.findById(postId);  
    if (userId.toString() != post.creator.toString()) {
        error = new Error("Unauthorized");
        error.statusCode = 401;
        throw error;
    }
    if (!post) {
        const error = new Error("Post Not Found");
        error.statusCode = 404;
        throw error;
    }
    HelperClass.deleteFile(post.imageURL);
    
    try {
        const result = await PostModel.findByIdAndRemove(postId);
        const user = await UserModel.findById(userId);
        user.posts.pull(postId);
        await user.save();
        res.status(201).json({response:'success', message:"Post Deleted Successfully"});

    } catch (err) {
        next(err);
    }



};