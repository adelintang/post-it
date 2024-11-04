import Joi from 'joi'

import { UserRole } from '../../prisma/client'
import { joiGeneralMessage } from '../../utils'

export const registerSchema = Joi.object({
	username: Joi.string()
		.alphanum()
		.min(6)
		.required()
		.messages(joiGeneralMessage),
	email: Joi.string().email().required().messages(joiGeneralMessage),
	password: Joi.string().min(8).required().messages(joiGeneralMessage),
	role: Joi.valid(UserRole.ADMIN, UserRole.USER)
		.required()
		.messages(joiGeneralMessage),
})

export const loginSchema = Joi.object({
	email: Joi.string().email().required().messages(joiGeneralMessage),
	password: Joi.string().min(8).required().messages(joiGeneralMessage),
})
