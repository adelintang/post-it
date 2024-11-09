import type { Request, Response, NextFunction } from 'express'

import type { QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { ResponseHandler, MESSAGE } from '../../utils'

import * as commentService from './comment.service'

export const createComment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const comment = await commentService.createComment(body)
	if (comment instanceof AppError) {
		next(comment)
		return
	}
	ResponseHandler.created(res, comment, MESSAGE.SUCCESS.CREATED.COMMENT)
}

export const getComments = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const { postId } = req.params
	const comments = await commentService.getComments(postId, query)
	if (comments instanceof AppError) {
		next(comments)
		return
	}
	ResponseHandler.ok(
		res,
		comments?.data,
		MESSAGE.SUCCESS.GET.COMMENTS,
		comments?.meta,
	)
}

export const updateCommentOrReply = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { commentId } = req.params
	const { body } = req
	const comment = await commentService.updateCommentOrReply(commentId, body)
	if (comment instanceof AppError) {
		next(comment)
		return
	}
	ResponseHandler.ok(res, comment, MESSAGE.SUCCESS.UPDATED.COMMENT)
}

export const deleteCommentOrReply = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { commentId } = req.params
	const comment = await commentService.deleteCommentOrReply(commentId)
	if (comment instanceof AppError) {
		next(comment)
		return
	}
	ResponseHandler.ok(res, comment, MESSAGE.SUCCESS.DELETED.COMMENT)
}

export const createReply = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const reply = await commentService.createReply(body)
	if (reply instanceof AppError) {
		next(reply)
		return
	}
	ResponseHandler.created(res, reply, MESSAGE.SUCCESS.CREATED.REPLY)
}

export const getReplies = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const { commentId } = req.params
	const replies = await commentService.getReplies(commentId, query)
	if (replies instanceof AppError) {
		next(replies)
		return
	}
	ResponseHandler.ok(
		res,
		replies?.data,
		MESSAGE.SUCCESS.GET.REPLIES,
		replies?.meta,
	)
}
