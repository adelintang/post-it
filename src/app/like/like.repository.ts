import type { QueryParams } from '../../interface'
import type { Like } from '../../prisma/client'
import { db, generateUUID } from '../../utils'

export const likePost = async (like: Like) => {
	return db.like.create({
		data: {
			id: `like-${generateUUID()}`,
			post_id: like.post_id,
			user_id: like.user_id,
		},
	})
}

export const getLikePost = async (postId: string, userId: string) => {
	return db.like.findFirst({
		where: {
			AND: [{ post_id: postId }, { user_id: userId }],
		},
	})
}

export const unlikePost = async (likeId: string) => {
	return db.like.delete({
		where: {
			id: likeId,
		},
	})
}

export const getWhoLikesPost = async (postId: string, query: QueryParams) => {
	const { search = '' } = query
	return db.like.findMany({
		where: {
			post_id: postId,
			user: {
				username: {
					contains: search.trim(),
				},
			},
		},
		include: {
			user: {
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

export const likeComment = async (like: Like) => {
	return db.like.create({
		data: {
			id: `like-${generateUUID()}`,
			comment_id: like.comment_id,
			user_id: like.user_id,
		},
	})
}

export const getLikeComment = async (commentId: string, userId: string) => {
	return db.like.findFirst({
		where: {
			AND: [{ comment_id: commentId }, { user_id: userId }],
		},
	})
}

export const unlikeComment = async (likeId: string) => {
	return db.like.delete({
		where: {
			id: likeId,
		},
	})
}
