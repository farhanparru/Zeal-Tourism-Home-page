const Joi = require("joi");

const JoiUserschema = Joi.object({
  FirstName: Joi.string().alphanum().min(3).max(30),
  email: Joi.string()
    // .email({ minDomainSegments: 2 })
    .required(),
  PhoneNumber: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}(?:\s?\d{1,4})*$/)
    .required(),
  password: Joi.string().min(8).required(),
});

module.exports = JoiUserschema
