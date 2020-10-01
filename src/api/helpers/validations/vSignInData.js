const Joi = require('@hapi/joi');

module.exports = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': `debe ingresar un email corrrecto`,
    'string.base': `"email" debe ser del tipo texto`,
    'any.required': `"Email" es requerido`
  }),
  password: Joi.string().required().messages({
    'string.base': `"Nombre" debe ser texto`,
    'any.required': `"Nombre" es requerido`
  })
});
