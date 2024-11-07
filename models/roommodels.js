import { Schema, model } from "mongoose";

const roomSchema = new Schema({
    name: { type: String, min: [5], required: true, unique: true },
    description: { type: String, required: true }
},
    {
        timestamps: true
    }
);

export const RoomModel = model('Room', roomSchema);


