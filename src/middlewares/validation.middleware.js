import Joi from "joi";

const eventSchema = Joi.object({
  date: Joi.date().greater('now').required(),
  category_id: Joi.number().integer().greater(0).less(4).required(),
  sub_category_id: Joi.number().integer().greater(0).less(8).required(),
  type: Joi.string().min(6).max(7).required(),
  event_link: Joi.string().uri().required(),
  organizer: Joi.string().min(2).max(40).trim().required(),
  profession: Joi.string().min(2).max(40).trim().required(),
  fullname: Joi.string().min(5).required(),
  contact: Joi.string().required(),
  title: Joi.string().min(2).max(100).trim().required(),
  description: Joi.string().min(10).max(300).trim().required(),
  img: Joi.string().pattern(new RegExp(/\.(gif|jpe?g|png|webp)$/i)),
  text: Joi.string().min(30).max(1000).trim().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required()
});

const POST = (req, res, next) => {
  try {
    if (req.url == '/events' && req.method == 'POST') {
      let eventValidate = eventSchema.validate(req.body);

      if (eventValidate.error) 
        throw new Error(eventValidate.error);

      next();
    }

    if (req.url == '/login' && req.method == 'POST') {
      let loginValidate = loginSchema.validate(req.body);

      if (loginValidate.error) 
        throw new Error(loginValidate.error);

      next();
    }
  } catch (error) {
    res.status(400).send({
      status: error.status,
      message: error.message
    });
  }
}

export {
  POST
}