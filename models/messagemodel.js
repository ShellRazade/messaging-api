import { toJSON } from "@reis/mongoose-to-json";
import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: { type: String, required: true },
    room: { type: Types.ObjectId, ref: "room", required: true }
},
    {
        timestamp: { type: Date, default: Date.now },
    }
);

messageSchema.plugin(toJSON);

export const MessageModel = model("Message", messageSchema);