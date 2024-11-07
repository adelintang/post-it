import { type QueryParams } from '../../interface'
import type { Follow } from '../../prisma/client'
import { db, generateUUID } from '../../utils'

export const follow = async (follow: Follow) => {
	return db.follow.create({
		data: {
			id: `follow-${generateUUID()}`,
			follower_id: follow.follower_id,
			following_id: follow.following_id,
		},
	})
}

export const unfollow = async (followId: string) => {
	return db.follow.delete({
		where: {
			id: followId,
		},
	})
}

export const getFollowByFollowerIdAndFollowingId = async (follow: Follow) => {
	return db.follow.findFirst({
		where: {
			AND: [
				{ follower_id: follow.follower_id },
				{ following_id: follow.following_id },
			],
		},
	})
}

export const getFollowers = async (userId: string, query: QueryParams) => {
	const { search = '' } = query
	return db.follow.findMany({
		where: {
			following_id: userId,
			follower: {
				username: {
					contains: search.trim(),
					mode: 'insensitive',
				},
			},
		},
		include: {
			follower: {
				include: {
					profile: {
						include: {
							profileImage: true,
						},
					},
				},
			},
		},
	})
}

export const getFollowersCount = async (userId: string) => {
	return db.follow.count({
		where: {
			following_id: userId,
		},
	})
}

export const getFollowings = async (userId: string, query: QueryParams) => {
	const { search = '' } = query
	return db.follow.findMany({
		where: {
			follower_id: userId,
			following: {
				username: {
					contains: search.trim(),
					mode: 'insensitive',
				},
			},
		},
		include: {
			following: {
				include: {
					profile: {
						include: {
							profileImage: true,
						},
					},
				},
			},
		},
	})
}

export const getFollowingsCount = async (userId: string) => {
	return db.follow.count({
		where: {
			follower_id: userId,
		},
	})
}
