import Joi from "joi";

export const roomValidator = Joi.object({
    roomName: Joi.string().min(5).required(),
    description: Joi.string().required()
}); 