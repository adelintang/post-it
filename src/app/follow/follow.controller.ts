import type { Request, Response, NextFunction } from 'express'

import { type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGE, ResponseHandler } from '../../utils'

import * as followService from './follow.service'

export const follow = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const data = await followService.follow(body)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.created(res, data, MESSAGE.SUCCESS.CREATED.FOLLOW)
}

export const unfollow = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const data = await followService.unfollow(body)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(res, data, MESSAGE.SUCCESS.DELETED.UNFOLLOW)
}

export const getFollowsCount = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { userId } = req.params
	const data = await followService.getFollowsCount(userId)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(res, data, MESSAGE.SUCCESS.GET.FOLLOWS_COUNT)
}

export const getFollowers = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const { userId } = req.params
	const data = await followService.getFollowers(userId, query)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(res, data, MESSAGE.SUCCESS.GET.FOLLOWERS)
}

export const getFollowings = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const { userId } = req.params
	const data = await followService.getFollowings(userId, query)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(res, data, MESSAGE.SUCCESS.GET.FOLLOWINGS)
}
