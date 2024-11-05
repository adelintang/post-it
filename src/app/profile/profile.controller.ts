import type { Request, Response, NextFunction } from 'express'

import { type QueryParams } from '../../interface'
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

export const getProfiles = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const profiles = await profileService.getProfiles(query)
	if (profiles instanceof AppError) {
		next(profiles)
		return
	}
	ResponseHandler.ok(
		res,
		profiles?.data,
		MESSAGE.SUCCESS.GET.PROFILES,
		profiles?.meta,
	)
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
