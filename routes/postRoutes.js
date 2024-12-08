import express from 'express';
import userAuth from '../middleware/authMiddleware.js';
import {commentPost, createPost, deletePost, getComments, getPosts, getUserPost, likePost, likePostComment, replyPostComment} from'../Controllers/postController.js'

const router = express.Router();

//Create a New Post
router.post('/create-post', userAuth, createPost);

// Get posts
router.post("/", userAuth, getPosts); // Note the 's'//Get all Posts with search parameters as optional
router.post("/:id", userAuth, getPosts);
router.post("/get-user-post/:id", userAuth, getUserPost);

//Like or Unlike a Post
router.post("/like/:postId", userAuth, likePost);

//delete post
router.delete("/:id", userAuth, deletePost);

//Comment Routes
router.get("/comments/:postId", getComments);//Get All Comments on a Post

router.post("/comment/:id", userAuth, commentPost);//Comment on a Post

router.post("/like-comment/:id/:rid?", userAuth, likePostComment);//reply id is optional that's why written with ?

router.post("/reply-comment/:id", userAuth, replyPostComment);//Reply to a Comment on a post with a comment

export default router;