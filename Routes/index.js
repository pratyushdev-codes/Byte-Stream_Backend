import express from "express";
import authRoute from "./authRoute.js";
import userRoute from './userRoute.js';
import postRoute from './postRoute.js';
const router = express.Router();

router.use(`/auth`, authRoute); //auth/register
router.use(`/users`, userRoute); //user/verify
router.use(`/posts`, postRoute); //user/verify

export default router;