import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
}, { timestamps: true });

export const User = mongoose.model('user', userSchema);
