const Joi = require('joi');

module.exports = Joi.object({
  username: Joi.string().required().empty().min(5)
    .max(20)
    .messages({
      'string.base': '"username" asdasdasdasd be a type of \'text\'',
      'string.empty': '"username" asda be an empty field',
      'string.min': '"username" shouldasda have a minimum length of {#limit}',
      'string.max': '"username" shoulasdas have a maximum length of {#limit}',
      'any.required': '"username" is a rasdasequired field'
    })
});
