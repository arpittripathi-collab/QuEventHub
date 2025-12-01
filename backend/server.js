import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import authRoute from './routes/authRoute.js';
import eventRoute from './routes/eventRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use('/api/auth', authRoute);  
app.use('/api/events', eventRoute); 

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running at http://localhost:${PORT}`);
});