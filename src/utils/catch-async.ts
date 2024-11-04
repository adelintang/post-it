import type { Request, Response, NextFunction } from 'express'

import { ERROR_CODE } from '../interface'
import { AppError } from '../middleware'
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '../prisma/client/runtime/library'

import { handlePrismaError } from './handle-prisma-error'

export const catchAsync =
	(func: any) => (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(func(req, res, next)).catch((error) => {
			if (error.isJoi === true) {
				error.status = 400
				error.name = 'Bad Request'
			}
			// handle prisma errors
			if (error instanceof PrismaClientValidationError) {
				const errorDetails = error.message.split('\n').join(' ')
				const errorMessage = `Database request failed: ${errorDetails}`
				const err = new AppError(ERROR_CODE.BAD_REQUEST.code, errorMessage)
				next(err)
				return
			}
			if (error instanceof PrismaClientKnownRequestError) {
				const errorMessage: string = `${error.code} - ${handlePrismaError(error)}`
				const err = new AppError(ERROR_CODE.BAD_REQUEST.code, errorMessage)
				next(err)
				return
			}
			next(error)
		})
	}
