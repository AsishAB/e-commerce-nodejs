const express = require('express');
const router = express.Router();


const PostController = require('../controllers/PostController');
const MulterMiddleware = require('../middlewares/MulterMiddleware');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
// GET /feed/posts
router.get('/posts',AuthMiddleware , PostController.getPosts);

// POST /feed/post
router.post('/addEditpost',AuthMiddleware,MulterMiddleware('posts') , PostController.addEditPost);

router.get('/posts/:postId',AuthMiddleware, PostController.getPostById);

router.put('/addEditpost/:postId',AuthMiddleware,MulterMiddleware('posts') , PostController.addEditPost);

router.delete('/deletePost/:postId',AuthMiddleware, PostController.deletePost);

module.exports = router;