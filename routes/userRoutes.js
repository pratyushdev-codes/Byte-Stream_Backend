import express from 'express'
import path from 'path'
import { requestPasswordReset,verifyEmail, changePassword} from '../Controllers/userController';



const router = express.Router();
const __dirname =path.resolve(path.dirname("")) 

router.get("/verify/:userId/:token", verifyEmail);

//RESET PASSWORD

router.post("/request-passwordreset",requestPasswordReset );   //might be an error here whiel callling / naming
router.get("/reset-password/:userId/:token", resetPasswordLink);     //might be an error over here
router.post("/reset-password", changePassword);


router.get("/verified", (req, res)=>{
    res.sendFile(path.join(__dirname, "./Views/build", "index.html"));
})


router.get("/resetpassword", (req, res)=>{
    res.sendFile(path.join(__dirname, "./Views/build", "index.html"));
})