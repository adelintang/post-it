import { Router } from 'express'

import { validateRequest } from '../../middleware'
import { catchAsync, limiterAuth } from '../../utils'

import { register, login, refreshToken, logout } from './auth.controller'
import { loginSchema, registerSchema } from './auth.request'

const route = Router()

route.post('/register', validateRequest(registerSchema), catchAsync(register))
route.post(
	'/login',
	limiterAuth,
	validateRequest(loginSchema),
	catchAsync(login),
)
route.post('/refresh-token', catchAsync(refreshToken))
route.delete('/logout', logout)

export default route
