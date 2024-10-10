import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'


//Security Packages
import helment from'helmet'
import dbConnection from './dbConfig/dbConnection.js'




dotenv.config

const app = express()

const PORT = process.env.PORT || 8080;


app.use(helment());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json({limit : "10mb"}));
app.use(express.urlencoded({extended:true}))


app.use(morgan("dev"));

dbConnection();


app.listen(PORT,()=>{
    console.log(`Server is running on Port: ${PORT}` );
})


