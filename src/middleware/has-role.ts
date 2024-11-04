import type { Request, Response, NextFunction } from 'express'

import { type RequestWithAuthPayload } from '../interface'
import { type UserRole } from '../prisma/client'
import { MESSAGE, ResponseHandler } from '../utils'

export const hasRole =
	(role: UserRole) => (req: Request, res: Response, next: NextFunction) => {
		const reqWithAuth = req as unknown as RequestWithAuthPayload
		const verify = reqWithAuth.tokenPayload.role === role
		if (!verify) {
			ResponseHandler.forbidden(next, MESSAGE.ERROR.FORBIDDEN)
			return
		}
		next()
	}
