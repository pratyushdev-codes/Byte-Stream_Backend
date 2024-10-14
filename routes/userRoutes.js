import express from 'express'
import path from 'path'


const router = express.Router();
const __dirname =path.resolve(path.dirname("")) 

router.get("/verify/:userId/:token", verifyEmail);