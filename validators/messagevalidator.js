import Joi from "joi";

export const postMessageValidator = Joi.object({
    content: Joi.string().required()
});
