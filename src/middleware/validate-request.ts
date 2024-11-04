import type { Request, Response, NextFunction } from 'express'
import type Joi from 'joi'

import { ResponseHandler, cleanJoiErrorMessage } from '../utils'

export const validateRequest =
	(schema: Joi.ObjectSchema, type: 'params' | 'body' | 'query' = 'body') =>
	(req: Request, res: Response, next: NextFunction) => {
		let error
		if (type === 'params') {
			error = schema.validate(req.params).error
		} else if (type === 'body') {
			error = schema.validate(req.body).error
		} else if (type === 'query') {
			error = schema.validate(req.query).error
		}

		if (error) {
			ResponseHandler.badRequest(next, cleanJoiErrorMessage(error))
			return
		}
		next()
	}
