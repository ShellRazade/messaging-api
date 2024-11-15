import { Schema, Types, model } from "mongoose";

const imageSchema = new Schema({
    content: { type: String, required: false },
    image: { type: String,},
    room: { type: Types.ObjectId, ref: "Room", required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
});

export const ImageModel = model("Image", imageSchema);
