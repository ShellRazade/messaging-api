import { MessageModel } from "../models/messagemodel.js";
import { imageValidator } from "../validators/imagevalidator.js";

export const postImage = async (req, res, next) => {
    console.log("body-->", req.body);
    try {
        // Validate input
        const { error, value } = imageValidator.validate({
            ...req.body,
            image: req.file?.filename
        });
        if (error) {
            return res.status(400).json({
                message: error.message
            });
        }
        // Write image to database
        await MessageModel.create({
            ...value,
            user: req.auth.id
        });
        res.status(201).json("Image sent!");
    } catch (error) {
        next(error);
    }
}
