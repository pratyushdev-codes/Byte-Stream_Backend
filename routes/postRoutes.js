import express from 'express';
import userAuth from '../middleware/authMiddleware.js';

const router = express.Router();

//creating post :-
router.post("/create-post",userAuth,createPost);