import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import type { RequestWithAuthPayload, AuthPayload } from '../interface'
import { MESSAGE, ResponseHandler } from '../utils'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as jwt.Secret

export const authentication = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.headers?.authorization?.split(' ')[1]
		if (!token) {
			ResponseHandler.unauthorized(next, MESSAGE.ERROR.UNAUTHORIZED.NO_TOKEN)
			return
		}
		const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as AuthPayload
		if (Object.keys(decoded).length === 0) {
			ResponseHandler.unauthorized(
				next,
				MESSAGE.ERROR.UNAUTHORIZED.INVALID_TOKEN,
			)
			return
		}
		;(req as unknown as RequestWithAuthPayload).tokenPayload = decoded
		next()
	} catch (error: any) {
		console.error('error auth middleware: ', error)
		ResponseHandler.unauthorized(next, error.message)
	}
}
