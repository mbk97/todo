import Joi from "joi";

export const todoInputValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  completed: Joi.boolean().required(),
});
