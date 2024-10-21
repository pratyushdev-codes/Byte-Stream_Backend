import express from 'express';
import userAuth from '../middleware/authMiddleware.js';
import {createPost} from'../Controllers/postController.js'


const router = express.Router();

//creating post :-
router.post("/create-post",userAuth,createPost);


//fetch post
router.get("/",userAuth, getPosts);

export default router