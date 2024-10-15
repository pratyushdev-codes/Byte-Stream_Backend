import express from 'express'
import path from 'path'
import { verifyEmail} from '../Controllers/userController';
import {resetPasswordLink} from '../utils/sendEmail'


const router = express.Router();
const __dirname =path.resolve(path.dirname("")) 

router.get("/verify/:userId/:token", verifyEmail);
router.get("reset-password/:userId/:token", resetPasswordLink);     //might be an error over here

router.get("/verified", (req, res)=>{
    res.sendFile(path.join(__dirname, "./Views/build", "index.html"));
})
