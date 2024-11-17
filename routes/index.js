import express from "express";
import authRoutes from './authRoutes.js'
import postRoutes from './postRoutes.js'
import   userRoutes from './userRoutes.js'


const router = express.Router();


router.use("/auth", authRoutes) //auth/register
router.use("/users", userRoutes);
router.use('/posts', postRoutes);


export default router