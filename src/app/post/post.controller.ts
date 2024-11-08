import type { Request, Response, NextFunction } from 'express'

import type { QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGE, ResponseHandler } from '../../utils'

import * as postService from './post.service'

export const createPost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const post = await postService.createPost(body)
	if (post instanceof AppError) {
		next(post)
		return
	}
	ResponseHandler.created(res, post, MESSAGE.SUCCESS.CREATED.POST)
}

export const getPosts = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const posts = await postService.getPosts(query)
	if (posts instanceof AppError) {
		next(posts)
		return
	}
	ResponseHandler.ok(res, posts?.data, MESSAGE.SUCCESS.GET.POSTS, posts?.meta)
}

export const getPost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { postId } = req.params
	const post = await postService.getPost(postId)
	if (post instanceof AppError) {
		next(post)
		return
	}
	ResponseHandler.ok(res, post, MESSAGE.SUCCESS.GET.POST)
}

export const updatePost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { postId } = req.params
	const { body } = req
	const post = await postService.updatePost(postId, body)
	if (post instanceof AppError) {
		next(post)
		return
	}
	ResponseHandler.ok(res, post, MESSAGE.SUCCESS.UPDATED.POST)
}

export const deletePost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { postId } = req.params
	const post = await postService.deletePost(postId)
	if (post instanceof AppError) {
		next(post)
		return
	}
	ResponseHandler.ok(res, post, MESSAGE.SUCCESS.DELETED.POST)
}
