const Joi = require('@hapi/joi');

module.exports = Joi.object({
  // username: Joi.string().min(2).max(10).required().messages({
  //   'string.base': `"Nombre de usuario" debe ser de tipo texto`,
  //   'string.empty': `"Nombre de usuario" no puede estar vacio`,
  //   'string.min': `"Nombre de usuario" debe tener un minimo de {#limit} caracteres`,
  //   'string.max': `"Nombre de usuario" debe ser igual o menor a {#limit} caracteres`,
  //   'any.required': `"Nombre de usuario" es requerido`
  // })
  email: Joi.string().email().required().messages({
    'string.email': `debe ingresar un email corrrecto`,
    'string.base': `"email" debe ser del tipo texto`,
    'any.required': `"Email" es requerido`
  }),
  firtName: Joi.string().required().messages({
    'string.base': `"Nombre" debe ser texto`,
    'any.required': `"Nombre" es requerido`
  }),
  lastName: Joi.string().required().messages({
    'string.base': `"Apellido" debe ser texto`,
    'any.required': `"Apellido" es requerido`
  }),
  rut: Joi.string().required().messages({
    'string.base': `"Apellido" debe ser texto`,
    'any.required': `"Apellido" es requerido`
  }),
  password: Joi.string().required().messages({
    'string.base': `"Contrasena" debe ser texto`,
    'any.required': `"Contrasena" es requerido`
  }),
  modelsOfPrinters: Joi.array().items(
    Joi.object({
      refPrint: Joi.string().required().messages({
        'string.base': 'el modelo debe referenciar un id'
      })
    }).messages({
      'array.base': `"El model de impresora", `,
      'any.required': `"El model de impresora", es requeridos`
    })
  ),
  phoneNumber: Joi.number().messages({
    'number.base': `Debe ingresar un numero valido`
  }),
  profileImgUrl: Joi.string().messages({
    'string.base': 'Debe ingresar una img valida'
  }),
  userType: Joi.string().required().messages({
    'string.base': 'El tipo de usuario debe ser texto plano',
    'any.required': 'Tipo de usuario requerido'
  }),
  isVerified: Joi.boolean().messages({
    'boolean.base': 'Verificado debe ser booleano'
  }),
  feedback: Joi.number().required().messages({
    'number.base': `"Feedback" debe ser un numero`,
    'any.required': '"Feedback" de usuario requerido'
  })
});
