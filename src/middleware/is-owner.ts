import type { Request, Response, NextFunction } from 'express'

import * as profileRepository from '../app/profile/profile.repository'
import { type RequestWithAuthPayload } from '../interface'
import { MESSAGE, ResponseHandler } from '../utils'

export const isOwnerProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { profileId } = req.params
	const { tokenPayload } = req as unknown as RequestWithAuthPayload

	const profile = await profileRepository.getProfile(profileId)
	if (!profile) {
		ResponseHandler.notFound(next, MESSAGE.ERROR.NOT_FOUND.PROFILE)
		return
	}
	const verify = profile.user_id === tokenPayload.userId
	if (!verify) {
		ResponseHandler.forbidden(next, MESSAGE.ERROR.FORBIDDEN)
		return
	}
	next()
}
