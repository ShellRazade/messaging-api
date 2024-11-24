import Joi from "joi";

export const imageValidator = Joi.object({
    image: Joi.string().required(),
    room: Joi.string().required()
});
