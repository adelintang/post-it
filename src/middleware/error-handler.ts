import {
	type ErrorRequestHandler,
	type NextFunction,
	type Request,
	type Response,
} from 'express'
import { MulterError } from 'multer'

import { ERROR_CODE, type ApiResponse, type ErrorCode } from '../interface'
import { MESSAGE } from '../utils'

export const errorHandler: ErrorRequestHandler = (
	err: AppError | Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof AppError) {
		const response: ApiResponse<null> = {
			status: 'error',
			error: {
				code: err.code,
				message: err.message,
			},
		}
		res.status(err.httpStatus).json(response)
		return
	}

	if (
		err instanceof SyntaxError &&
		'status' in err &&
		err.status === 400 &&
		'body' in err
	) {
		const response: ApiResponse<null> = {
			status: 'error',
			error: {
				code: ERROR_CODE.BAD_REQUEST.code,
				message: MESSAGE.ERROR.BODY.INVALID_JSON_PAYLOAD,
			},
		}
		res.status(ERROR_CODE.BAD_REQUEST.httpStatus).json(response)
		return
	}

	if (err instanceof MulterError) {
		const response: ApiResponse<null> = {
			status: 'error',
			error: {
				code: ERROR_CODE.BAD_REQUEST.code,
				message: MESSAGE.ERROR.FILE.TO_LARGE,
			},
		}
		res.status(ERROR_CODE.BAD_REQUEST.httpStatus).json(response)
		return
	}

	console.error(err.stack)
	const response: ApiResponse<null> = {
		status: 'error',
		error: {
			code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			message: ERROR_CODE.INTERNAL_SERVER_ERROR.message,
		},
	}
	res.status(ERROR_CODE.INTERNAL_SERVER_ERROR.httpStatus).json(response)
}

export class AppError extends Error {
	public readonly code: ErrorCode
	public readonly httpStatus: number

	constructor(errorCode: ErrorCode, message?: string) {
		super(ERROR_CODE[errorCode].message)
		this.message = message ?? ERROR_CODE[errorCode].message
		this.code = ERROR_CODE[errorCode].code
		this.httpStatus = ERROR_CODE[errorCode].httpStatus
	}
}
