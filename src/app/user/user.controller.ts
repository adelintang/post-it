import type { Request, Response, NextFunction } from 'express'

import { type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGE, ResponseHandler } from '../../utils'

import * as userService from './user.service'

export const getUsers = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const users = await userService.getUsers(query)
	if (users instanceof AppError) {
		next(users)
		return
	}
	ResponseHandler.ok(res, users?.data, MESSAGE.SUCCESS.GET.USERS, users?.meta)
}

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { userId } = req.params
	const user = await userService.getUser(userId)
	if (user instanceof AppError) {
		next(user)
		return
	}
	ResponseHandler.ok(res, user, MESSAGE.SUCCESS.GET.USER)
}
