import rateLimit from 'express-rate-limit'

import { MESSAGE } from './messages'
import { ResponseHandler } from './response-handler'

export const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 100, // max 100 request per IP per 1 minute
	standardHeaders: true,
	legacyHeaders: false,
	handler: (req, res, next) => {
		ResponseHandler.tooManyRequests(
			next,
			MESSAGE.ERROR.TOO_MANY_REQUESTS.COMMON,
		)
	},
})

export const limiterAuth = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minute,
	max: 3, // max 3 request in 15 minute,
	standardHeaders: true,
	legacyHeaders: false,
	keyGenerator: (req) => {
		return req.body.email
	},
	handler: (req, res, next) => {
		ResponseHandler.tooManyRequests(next, MESSAGE.ERROR.TOO_MANY_REQUESTS.LOGIN)
	},
})
