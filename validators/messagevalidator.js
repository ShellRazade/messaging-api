import Joi from "joi";

export const messageValidator = Joi.object({
    content: Joi.string().required()
});
