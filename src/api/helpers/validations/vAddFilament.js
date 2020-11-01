const Joi = require('@hapi/joi');

module.exports = Joi.object({
  filamentName: Joi.string().required().messages({
    'string.base': `El nombre filamento debe ser texto plano`,
    'any.required': `"Nombre del filamento" es requerido`
  })
});
