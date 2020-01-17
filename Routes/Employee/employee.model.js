const Joi = require('@hapi/joi')

const validate = (data) => {
  const schema = Joi.object({
    Emp_id: Joi.number().min(3).required(),
    Name: Joi.string().min(3).max(15),
    Age: Joi.number().min(2).required(),
    Phone: Joi.number().min(10).required(),
    Department: Joi.string().min(3).max(10).required()
  })
  return schema.validate(data)
}

module.export = validate
