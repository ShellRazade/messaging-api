import Joi from "joi";

export const roomValidator = Joi.object({
    name: Joi.string().min(5).required(),
    description: Joi.string().required()
}); 