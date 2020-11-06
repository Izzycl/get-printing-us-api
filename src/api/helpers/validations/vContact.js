const Joi = require('@hapi/joi');

module.exports = Joi.object({
  firstName: Joi.string().required().messages({
    'string.base': `"Nombre"debe ser texto plano`,
    'any.required': `"Nombre" es requerido`
  }),
  lastName: Joi.string().required().messages({
    'string.base': `"Apellido" debe ser texto`,
    'any.required': `"Apellido" es requerido`
  }),
  email: Joi.string().email().required().messages({
    'string.email': `debe ingresar un email corrrecto`,
    'string.base': `"email" debe ser del tipo texto`,
    'any.required': `"Email" es requerido`
  }),
  message: Joi.string().required().messages({
    'string.base': `"Mensaje" debe ser texto`,
    'any.required': `"Mensaje" es requerido`
  })
});
