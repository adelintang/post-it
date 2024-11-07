import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const followSchema = Joi.object({
	follower_id: Joi.string().required().messages(joiGeneralMessage),
	following_id: Joi.string().required().messages(joiGeneralMessage),
})

export const unfollowSchema = Joi.object({
	follower_id: Joi.string().required().messages(joiGeneralMessage),
	following_id: Joi.string().required().messages(joiGeneralMessage),
})
