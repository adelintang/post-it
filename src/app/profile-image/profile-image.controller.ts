import type { Request, Response, NextFunction } from 'express'

import { ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGE, ResponseHandler } from '../../utils'

import * as profileImageService from './profile-image.service'

export const createProfileImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { file } = req
	const { profileId } = req.params
	if (!file) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.FILE.NOT_PROVIDED,
		)
		next(error)
		return
	}
	const data = await profileImageService.createProfileImage(profileId, file)
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
