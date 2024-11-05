import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const createProfileSchema = Joi.object({
	fullname: Joi.string().min(6).required().messages(joiGeneralMessage),
	bio: Joi.string().min(6).required().messages(joiGeneralMessage),
	user_id: Joi.string().required().messages(joiGeneralMessage),
})

export const updateProfileSchema = Joi.object({
	fullname: Joi.string().min(6).optional().messages(joiGeneralMessage),
	bio: Joi.string().min(6).optional().messages(joiGeneralMessage),
})
