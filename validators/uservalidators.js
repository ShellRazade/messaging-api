import Joi from "joi";

export const userRegisterValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});

export const userLoginValidator = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

export const userUpdateValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
   
});

    

    