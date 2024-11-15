import Joi from "joi";

export const imageValidator = Joi.object({
    content: Joi.string(),
    image: Joi.string(),
    room: Joi.string(),
});
