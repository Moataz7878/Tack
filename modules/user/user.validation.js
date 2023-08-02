import Joi from "joi";

export const signUpValidatinon = {
    body: Joi.object()
      .required()
      .keys({
        name: Joi.string().min(2).required().messages({
          "string.min": "firstName must contain at least 2 charachters",
        }),
        the_line: Joi.string().min(2).messages({
          "string.min": "the_line must contain at  charachters",
        }),
        school: Joi.string().min(2).required().messages({
          "string.min": "School must contain at  charachters",
        }),
        governorate: Joi.string().min(2).messages({
          "string.min": "governorate must contain at  charachters",
        }),
        Area: Joi.string().min(2).messages({
          "string.min": "Area must contain at  charachters",
        }),
        role: Joi.string().min(4).required().messages({
          "string.min": "role must contain at  charachters",
        }),
        material:Joi.string().min(3).message({
          "string.min": "material",

        }),

        email: Joi.string()
          .email({ tlds: { allow: ["com", "net"] }, minDomainSegments: 2 })
          .required()
          .messages({
            "string.email": "Email format in-valid",
            "any.required": "please enter your email",
          }),
        password: Joi.string().min(3).messages({
          "string.min": "password",
        }),
        confirm_Password:Joi.string().min(3).message({
          "string.min": "confirm_Password",
        })
      }),
  };


  export const loginValidation = {
    body: Joi.object()
      .required()
      .keys({
        email: Joi.string()
          .email({ tlds: { allow: ["com", "net"] }, minDomainSegments: 2 })
          .required()
          .messages({
            "string.email": "Email format in-valid",
            "any.required": "please enter your email",
          }),
        password: Joi.string().required().min(4).max(16).messages({
          "string.min": "password must contain at least 4 charachters",
        }),
      }),
  };
  