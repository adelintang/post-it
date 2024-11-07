import type { Request, Response, NextFunction } from 'express'

import { AppError } from '../../middleware'
import { MESSAGE, ResponseHandler } from '../../utils'

import * as profileService from './profile.service'

export const createProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const profile = await profileService.createProfile(body)
	if (profile instanceof AppError) {
		next(profile)
		return
	}
	ResponseHandler.created(res, profile, MESSAGE.SUCCESS.CREATED.PROFILE)
}

export const getProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { profileId } = req.params
	const profile = await profileService.getProfile(profileId)
	if (profile instanceof AppError) {
		next(profile)
		return
	}
	ResponseHandler.ok(res, profile, MESSAGE.SUCCESS.GET.PROFILE)
}

export const updateProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { profileId } = req.params
	const { body } = req
	const profile = await profileService.updateProfile(profileId, body)
	if (profile instanceof AppError) {
		next(profile)
		return
	}
	ResponseHandler.ok(res, profile, MESSAGE.SUCCESS.UPDATED.PROFILE)
}
