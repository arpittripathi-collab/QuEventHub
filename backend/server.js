import express from 'express';
import authRoute from './routes/authRoute.js';
import {connectDB} from './database/db.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT =  process.env.PORT ;



app.use(express.json());
app.use('/api', authRoute);     

app.listen(PORT,async()=>{
    await connectDB();
    console.log(`Server is running at http://localhost:${PORT}`);
});