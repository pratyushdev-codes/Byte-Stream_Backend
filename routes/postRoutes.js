import express from 'express';
import userAuth from '../middleware/authMiddleware.js';
import {commentPost, createPost, deletePost, getComments, getPost, getUserPost, likePost, likePostComment, replyPostComment} from'../Controllers/postController.js'


const router = express.Router();

//creating post :-
router.post("/create-post",userAuth,createPost);

//get post:-
router.post("/get-post",userAuth,createPost);

//fetch post
router.post("/",userAuth, getPost);


router.post("/get-user-post/:id", userAuth, getUserPost);


//get comments 
router.get("/comments/:postId", getComments);


//Like and comment on posts
router.post("/like/:id", userAuth, likePost);

router.post("/like-comment/:id/:rid?", userAuth , likePostComment);

router.post("'comment/:id", userAuth , commentPost);

router.post("/reply-comment/:id", userAuth , replyPostComment);



//Delete Post
router.delete("/:id" , userAuth , deletePost);

export default router