import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import authRoute from './routes/authRoutes.js';
import eventRoute from './routes/eventRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use('/api/auth', authRoute);  
app.use('/api/events', eventRoute); 
app.use("/api/clubs", clubRoutes);


app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running at http://localhost:${PORT}`);
});


// import dotenv from 'dotenv';
// // 1. MUST be called synchronously at the very top.
// dotenv.config(); 

// import express from 'express';
// import cors from 'cors';
// import connectDB from './database/db.js';
// import userRoutes from './routes/userRoutes.js';
// import eventRoutes from './routes/eventRoutes.js';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// // --- Database Connection ---
// connectDB(); // Now, MONGO_URI should be defined when this runs

// const app = express();

// // --- Middleware ---
// app.use(cors());
// app.use(express.json()); // Allows parsing JSON body
// app.use(express.urlencoded({ extended: true })); // Allows parsing form data

// // --- Routes ---
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// app.use('/api/users', userRoutes);
// app.use('/api/events', eventRoutes);

// // --- Error Handling Middleware ---
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });