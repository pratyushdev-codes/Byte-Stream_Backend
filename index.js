import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Security Packages
import helmet from 'helmet';
import dbConnection from './dbConfig/dbConnection.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import route from './routes/mainRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

// Set up __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
app.use(express.static(path.join(__dirname, 'Views')));

// Routes
app.use(route);

// Error middleware
app.use(errorMiddleware);

// Database connection
dbConnection();

// Server
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});
