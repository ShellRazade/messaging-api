import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
    sender: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    room: { type: String, required: true }
});