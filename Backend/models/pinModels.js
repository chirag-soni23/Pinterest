import mongoose from 'mongoose';

const pinSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    image: {
        id: String,
        url: String
    },
    comments: [{
        user: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,

        },
        comment: {
            type: String,
            required: true,

        }
    }]
},{timestamps:true});

export const Pin = mongoose.model('pin',pinSchema);