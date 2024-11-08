import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const createPostSchema = Joi.object({
	content: Joi.string().required().messages(joiGeneralMessage),
	user_id: Joi.string().required().messages(joiGeneralMessage),
})

export const updatePostSchema = Joi.object({
	content: Joi.string().optional().messages(joiGeneralMessage),
})
