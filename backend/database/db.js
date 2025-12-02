import mongoose from "mongoose";



export const connectDB = async () => {
    try {
        if (!process.env.URL) {
            throw new Error('Database URL not found in environment variables. Please check your .env file.');
        }
        await mongoose.connect(process.env.URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error; // Re-throw to let the caller handle it
    }
}