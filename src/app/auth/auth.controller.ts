import type { Request, Response, NextFunction } from 'express'

import { RefreshTokenName } from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGE, ResponseHandler } from '../../utils'

import * as authService from './auth.service'

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const user = await authService.register(body)
	if (user instanceof AppError) {
		next(user)
		return
	}
	ResponseHandler.created(res, user, MESSAGE.SUCCESS.CREATED.USER)
}

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const token = await authService.login(body)
	if (token instanceof AppError) {
		next(token)
		return
	}
	const { accessToken, refreshToken } = token
	res.cookie(RefreshTokenName, refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	})
	ResponseHandler.ok(res, { accessToken }, MESSAGE.SUCCESS.LOGIN)
}

export const refreshToken = (
	req: Request & { cookies: { refreshToken: string } },
	res: Response,
	next: NextFunction,
) => {
	const { refreshToken } = req.cookies
	const accessToken = authService.refreshToken(refreshToken)
	if (accessToken instanceof AppError) {
		next(accessToken)
		return
	}
	ResponseHandler.ok(res, { accessToken }, MESSAGE.SUCCESS.ACCESS_TOKEN)
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
	res.clearCookie(RefreshTokenName)
	ResponseHandler.noContent(res, null)
}
