import { toJSON } from "@reis/mongoose-to-json";
import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: { type: String, required: false },
    image: { type: String, required: false },
    room: { type: Types.ObjectId, ref: "Room", required: true }
},
    {
        timestamp: { type: Date, default: Date.now },
    }
);

messageSchema.plugin(toJSON);

export const MessageModel = model("Message", messageSchema);