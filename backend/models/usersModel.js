import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    q_id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    section: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    emailOtp: {
        type: String
    },
    phoneOtp: {
        type: String
    },
    otpExpiry: {
        type: Date
    }
}, { timestamps: true });

const UserModel = mongoose.model("users", userSchema);

export default UserModel;