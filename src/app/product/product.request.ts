import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const createProductSchema = Joi.object({
	name: Joi.string().required().messages(joiGeneralMessage),
	desc: Joi.string().min(15).required().messages(joiGeneralMessage),
	price: Joi.number().required().messages(joiGeneralMessage),
	stock: Joi.number().required().messages(joiGeneralMessage),
	user_id: Joi.string().required().messages(joiGeneralMessage),
})

export const updateProductSchema = Joi.object({
	name: Joi.string().optional().messages(joiGeneralMessage),
	desc: Joi.string().min(15).optional().messages(joiGeneralMessage),
	price: Joi.number().optional().messages(joiGeneralMessage),
	stock: Joi.number().optional().messages(joiGeneralMessage),
})
