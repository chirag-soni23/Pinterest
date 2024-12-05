import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser'

const app = express();
const PORT = 5000 || process.env.PORT;

dotenv.config();
app.get('/',(req,res)=>{
    res.send("Hello")
})

// middleware
app.use(express.json());
app.use(cookieParser())


// routes
app.use('/api/user',userRoutes);

// server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDb();
})