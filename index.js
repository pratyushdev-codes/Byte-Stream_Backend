import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from "path";
import router from "./Routes/index.js";
import dbConnection from './dbConfig/index.js';
import errorMiddleware from './Middleware/errorMiddleware.js';
//Security Packages
import helmet from 'helmet';

const __dirname = path.resolve(path.dirname(""));

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

dbConnection();

/*the app.use() function is used to mount middleware functions at a specified path. */

//Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



// Routes
app.use(router);

// Error middleware
app.use(errorMiddleware);

// Database connection
dbConnection();

app.use(express.static(path.join(__dirname, "Views")));
// Server
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});