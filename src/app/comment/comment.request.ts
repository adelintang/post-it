import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const createCommentSchema = Joi.object({
	content: Joi.string().required().messages(joiGeneralMessage),
	user_id: Joi.string().required().messages(joiGeneralMessage),
	post_id: Joi.string().required().messages(joiGeneralMessage),
})

export const updateCommentSchema = Joi.object({
	content: Joi.string().optional().messages(joiGeneralMessage),
})

export const createReplySchema = Joi.object({
	content: Joi.string().required().messages(joiGeneralMessage),
	user_id: Joi.string().required().messages(joiGeneralMessage),
	post_id: Joi.string().required().messages(joiGeneralMessage),
	parent_id: Joi.string().required().messages(joiGeneralMessage),
})
