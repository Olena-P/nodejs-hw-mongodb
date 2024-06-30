import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .required(),
  email: Joi.string().email().allow(null),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string().valid('personal', 'home').required(),
  // parentId: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .optional(),
  email: Joi.string().email().allow(null).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('personal', 'home').optional(),
}).or('name', 'phoneNumber', 'email', 'isFavourite', 'contactType');
