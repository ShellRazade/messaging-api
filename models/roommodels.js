import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model } from "mongoose";

const roomSchema = new Schema({
    roomName: { type: String, min: [5], required: true, unique: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},
    {
        timestamps: true
    }
);

roomSchema.plugin(toJSON);

export const RoomModel = model('Room', roomSchema);


