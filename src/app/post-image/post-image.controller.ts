import path from 'path'

import type { Request, Response, NextFunction } from 'express'

import {
	ERROR_CODE,
	DIRECTORY_NAME,
	type RequestFilePayload,
} from '../../interface'
import { AppError } from '../../middleware'
import { ResponseHandler, MESSAGE } from '../../utils'

import * as postImageService from './post-image.service'

export const createPostImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { file } = req
	const { fileUrl } = req as unknown as RequestFilePayload
	const { postId } = req.params
	if (!file) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.FILE.NOT_PROVIDED,
		)
		next(error)
		return
	}
	const data = await postImageService.createPostImage(postId, file, fileUrl)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.created(res, data, MESSAGE.SUCCESS.CREATED.POST_IMAGE)
}

export const updatePostImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { file } = req
	const { fileUrl } = req as unknown as RequestFilePayload
	const { postImageId } = req.params
	if (!file) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.FILE.NOT_PROVIDED,
		)
		next(error)
		return
	}
	const data = await postImageService.updatePostImage(
		postImageId,
		file,
		fileUrl,
	)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(res, data, MESSAGE.SUCCESS.UPDATED.POST_IMAGE)
}

export const deletePostImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { postImageId } = req.params
	const data = await postImageService.deletePostImage(postImageId)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(res, data, MESSAGE.SUCCESS.DELETED.POST_IMAGE)
}

export const getPostImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { filename } = req.params
	const filePath = path.join(
		__dirname,
		'..',
		'..',
		'..',
		DIRECTORY_NAME.BASE,
		DIRECTORY_NAME.POST,
		filename,
	)
	res.sendFile(filePath)
}
