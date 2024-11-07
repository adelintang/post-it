import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { type Follow } from '../../prisma/client'
import { MESSAGE } from '../../utils'
import * as userRepository from '../user/user.repository'

import type { IFollow } from './follow.interface'
import { followersDTOMapper, followingsDTOMapper } from './follow.mapper'
import * as followRepository from './follow.repository'

export const follow = async (data: Follow) => {
	const availabelFollower = await userRepository.getUser(data.follower_id)
	const availabelFollowing = await userRepository.getUser(data.following_id)
	if (!availabelFollower || !availabelFollowing) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.USER)
	}
	const follow = await followRepository.follow(data)
	if (!follow) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.FOLLOW,
		)
	}
	return follow
}

export const unfollow = async (data: Follow) => {
	const follow =
		await followRepository.getFollowByFollowerIdAndFollowingId(data)
	if (!follow) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.FOLLOW,
		)
	}
	const unfollow = await followRepository.unfollow(follow.id)
	if (!unfollow) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.UNFOLLOW,
		)
	}
	return unfollow
}

export const getFollowsCount = async (userId: string) => {
	const followers = await followRepository.getFollowersCount(userId)
	const followings = await followRepository.getFollowingsCount(userId)
	return {
		followers,
		followings,
	}
}

export const getFollowers = async (userId: string, query: QueryParams) => {
	const followers = await followRepository.getFollowers(userId, query)
	return followersDTOMapper(followers as IFollow[])
}

export const getFollowings = async (userId: string, query: QueryParams) => {
	const followings = await followRepository.getFollowings(userId, query)
	return followingsDTOMapper(followings as IFollow[])
}
