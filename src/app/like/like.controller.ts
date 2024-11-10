import type { Request, Response, NextFunction } from 'express'

import type { QueryParams, RequestWithAuthPayload } from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGE, ResponseHandler } from '../../utils'

import * as likeService from './like.service'

export const likePost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { postId } = req.params
	const { tokenPayload } = req as unknown as RequestWithAuthPayload
	const likePost = await likeService.likePost(postId, tokenPayload.userId)
	if (likePost instanceof AppError) {
		next(likePost)
		return
	}
	ResponseHandler.created(res, likePost, MESSAGE.SUCCESS.CREATED.LIKE_POST)
}

export const unlikePost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { postId } = req.params
	const { tokenPayload } = req as unknown as RequestWithAuthPayload
	const unlikePost = await likeService.unlikePost(postId, tokenPayload.userId)
	if (unlikePost instanceof AppError) {
		next(unlikePost)
		return
	}
	ResponseHandler.ok(res, unlikePost, MESSAGE.SUCCESS.DELETED.UNLIKE_POST)
}

export const getWhoLikesPost = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const { postId } = req.params
	const whoLikesPost = await likeService.getWhoLikesPost(postId, query)
	if (whoLikesPost instanceof AppError) {
		next(whoLikesPost)
		return
	}
	ResponseHandler.ok(res, whoLikesPost, MESSAGE.SUCCESS.GET.WHO_LIKES_POST)
}

export const likeComment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { commentId } = req.params
	const { tokenPayload } = req as unknown as RequestWithAuthPayload
	const likeComment = await likeService.likeComment(
		commentId,
		tokenPayload.userId,
	)
	if (likeComment instanceof AppError) {
		next(likeComment)
		return
	}
	ResponseHandler.created(
		res,
		likeComment,
		MESSAGE.SUCCESS.CREATED.LIKE_COMMENT,
	)
}

export const unlikeComment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { commentId } = req.params
	const { tokenPayload } = req as unknown as RequestWithAuthPayload
	const unlikeComment = await likeService.unlikeComment(
		commentId,
		tokenPayload.userId,
	)
	if (unlikeComment instanceof AppError) {
		next(unlikeComment)
		return
	}
	ResponseHandler.ok(res, unlikeComment, MESSAGE.SUCCESS.DELETED.UNLIKE_COMMENT)
}
