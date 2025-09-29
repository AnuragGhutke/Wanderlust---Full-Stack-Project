//first we did client side validation (form)
//then error handling
//now
const Joi = require('joi');//server side validation schema


module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.any(),
        price: Joi.number().required().min(0),
        country: Joi.string().required().pattern(/^[A-Za-z\s]+$/).messages({
            'string.pattern.base': 'Country must only contain letters'
        }),
        location: Joi.string().required().pattern(/^[A-Za-z\s]+$/).messages({
            'string.pattern.base': 'Location must only contain letters'
        }),

    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
})