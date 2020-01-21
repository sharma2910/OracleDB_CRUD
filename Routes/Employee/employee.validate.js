const Joi = require('@hapi/joi')

function ValidateInsert (data) {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(15),
    age: Joi.number().min(2).required(),
    phone: Joi.number().min(10).required(),
    department: Joi.string().min(2).max(10).required()
  })
  return schema.validate(data)
}

function ValidateUpdate (data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15),
    age: Joi.number().min(2).required(),
    phone: Joi.number().min(10).required(),
    department: Joi.string().min(2).max(10).required()
  })
  return schema.validate(data)
}

module.exports = {
  ValidateInsert,
  ValidateUpdate
}
