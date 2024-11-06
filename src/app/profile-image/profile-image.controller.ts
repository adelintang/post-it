import path from 'path'

import type { Request, Response, NextFunction } from 'express'

import {
	ERROR_CODE,
	DIRECTORY_NAME,
	type RequestFilePayload,
} from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGE, ResponseHandler } from '../../utils'

import * as profileImageService from './profile-image.service'

export const createProfileImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { file } = req
	const { fileUrl } = req as unknown as RequestFilePayload
	const { profileId } = req.params
	if (!file) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.FILE.NOT_PROVIDED,
		)
		next(error)
		return
	}
	const data = await profileImageService.createProfileImage(
		profileId,
		file,
		fileUrl,
	)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.created(res, data, MESSAGE.SUCCESS.CREATED.PROFILE_IMAGE)
}

export const updateProfileImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { file } = req
	const { fileUrl } = req as unknown as RequestFilePayload
	const { profileImageId } = req.params
	if (!file) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.FILE.NOT_PROVIDED,
		)
		next(error)
		return
	}
	const data = await profileImageService.updateProfileImage(
		profileImageId,
		file,
		fileUrl,
	)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(res, data, MESSAGE.SUCCESS.UPDATED.PROFILE_IMAGE)
}

export const deleteProfileImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { profileImageId } = req.params
	const data = await profileImageService.deleteProfileImage(profileImageId)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(res, data, MESSAGE.SUCCESS.DELETED.PROFILE_IMAGE)
}

export const getProfileImage = async (
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
		DIRECTORY_NAME.PROFILE,
		filename,
	)

	res.sendFile(filePath)
}
