import express, { Router } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'


//Security Packages
import helment from'helmet'
import dbConnection from './dbConfig/dbConnection.js'
import middlewareWrapper from 'cors'
import errorMiddleware from './middleware/errorMiddleware.js'
import route  from './routes/mainRoute.js'




dotenv.config();

const app = express()

const PORT = process.env.PORT || 8800;

 
app.use(helment());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json({limit : "10mb"}));
app.use(express.urlencoded({extended:true}))


app.use(morgan("dev"));
app.use(route)



//error middleware
app.use(errorMiddleware)
app.use(express.static(path.join(__dirname, "Views")));

dbConnection();


app.listen(PORT,()=>{
    console.log(`Server is running on Port: ${PORT}` );
})


