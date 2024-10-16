import express from "express";
import authRoutes from './authRoutes.js'
// import userRoute from "./userRoutes.js";


const router = express.Router();


router.use("/auth", authRoutes) //auth/register
// router.use("/users", userRoute);


export default router