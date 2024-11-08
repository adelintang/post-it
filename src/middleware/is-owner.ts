import type { Request, Response, NextFunction } from 'express'

import * as postRepository from '../app/post/post.repository'
import * as profileImageRepository from '../app/profile-image/profile-image.repository'
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

export const isOwnerProfileImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { profileImageId } = req.params
	const { tokenPayload } = req as unknown as RequestWithAuthPayload
	const profileImage =
		await profileImageRepository.getProfileImage(profileImageId)
	if (!profileImage) {
		ResponseHandler.notFound(next, MESSAGE.ERROR.NOT_FOUND.PROFILE_IMAGE)
		return
	}
	const profile = await profileRepository.getProfile(profileImage.profile_id)
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

export const isOwnerPost = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { postId } = req.params
	const { tokenPayload } = req as unknown as RequestWithAuthPayload
	const post = await postRepository.getPost(postId)
	if (!post) {
		ResponseHandler.notFound(next, MESSAGE.ERROR.NOT_FOUND.POST)
		return
	}
	const verify = post.user_id === tokenPayload.userId
	if (!verify) {
		ResponseHandler.forbidden(next, MESSAGE.ERROR.FORBIDDEN)
		return
	}
	next()
}
