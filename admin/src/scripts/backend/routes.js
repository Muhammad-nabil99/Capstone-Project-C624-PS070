const { addWisataHandler } = require('./wisata/handler');
const Joi = require('@hapi/joi');

const routes = [
  {
    method: 'POST',
    path: '/save-location',
    handler: addWisataHandler,
    options: {
      payload: {
        output: 'stream',
        parse: true,
        multipart: true,
      },
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          location: Joi.string().required(),
          openTime: Joi.string().required(),
          price: Joi.string().required(),
          detail: Joi.string().required(),
          image: Joi.any().required(),
          mapLocation: Joi.string().required(),
        })
      }
    },
  },
];

module.exports = routes;
