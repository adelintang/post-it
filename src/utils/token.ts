import jwt from 'jsonwebtoken'

import { type AuthPayload } from '../interface'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as jwt.Secret
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as jwt.Secret

export const generateAccessToken = (payload: AuthPayload) => {
	return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

export const generateRefreshToken = (payload: AuthPayload) => {
	return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
