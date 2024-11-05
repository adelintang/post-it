import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { type AuthPayload, ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'
import { generateAccessToken, generateRefreshToken, MESSAGE } from '../../utils'

import type { ILogin, IRegister } from './auth.interface'
import { registerDTOMapper } from './auth.mapper'
import * as authRepository from './auth.repository'

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as jwt.Secret

export const register = async (data: IRegister) => {
	const hashedPassword = await bcrypt.hash(data.password, 10)
	const user = { ...data, password: hashedPassword }
	const emailAlreadyUsed = await authRepository.getUserByEmail(data.email)
	if (emailAlreadyUsed) {
		return new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.BAD_REQUEST.EMAIL,
		)
	}
	const usernameAlreadyUsed = await authRepository.getUserByUsername(
		data.username,
	)
	if (usernameAlreadyUsed) {
		return new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.BAD_REQUEST.USERNAME,
		)
	}
	const newUser = await authRepository.register(user)
	if (!newUser) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.USER,
		)
	}
	return registerDTOMapper(newUser)
}

export const login = async (data: ILogin) => {
	const user = await authRepository.getUserByEmail(data.email)
	if (!user) {
		return new AppError(
			ERROR_CODE.UNAUTHORIZED.code,
			MESSAGE.ERROR.UNAUTHORIZED.LOGIN_FAILED,
		)
	}
	const verifyPassword = await bcrypt.compare(data.password, user.password)
	if (!verifyPassword) {
		return new AppError(
			ERROR_CODE.UNAUTHORIZED.code,
			MESSAGE.ERROR.UNAUTHORIZED.LOGIN_FAILED,
		)
	}
	const userPayload = {
		userId: user.id,
		role: user.role,
	}
	const accessToken = generateAccessToken(userPayload)
	const refreshToken = generateRefreshToken(userPayload)
	return {
		accessToken,
		refreshToken,
	}
}

export const refreshToken = (refreshToken?: string) => {
	try {
		if (!refreshToken) {
			return new AppError(
				ERROR_CODE.UNAUTHORIZED.code,
				MESSAGE.ERROR.UNAUTHORIZED.NO_TOKEN,
			)
		}
		const decoded = jwt.verify(
			refreshToken,
			REFRESH_TOKEN_SECRET,
		) as AuthPayload
		if (Object.keys(decoded).length === 0) {
			return new AppError(
				ERROR_CODE.UNAUTHORIZED.code,
				MESSAGE.ERROR.UNAUTHORIZED.INVALID_TOKEN,
			)
		}
		const userPayload = {
			userId: decoded.userId,
			role: decoded.role,
		}
		return generateAccessToken(userPayload)
	} catch (error: any) {
		return new AppError(ERROR_CODE.UNAUTHORIZED.code, error.message)
	}
}
