import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import pinRoutes from './routes/pinRoutes.js';
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'

const app = express();
const PORT = 5000;

dotenv.config();

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API,
    api_secret:process.env.CLOUD_SECRET
})

app.get('/',(req,res)=>{
    res.send("Hello")
})

// middleware
app.use(express.json());
app.use(cookieParser())


// routes
app.use('/api/user',userRoutes);
app.use('/api/pin',pinRoutes);

// server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDb();
})