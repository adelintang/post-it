import type { QueryParams } from '../../interface'
import type { Comment } from '../../prisma/client'
import { db, generateUUID } from '../../utils'

export const createComment = async (comment: Comment) => {
	return db.comment.create({
		data: {
			id: `comment-${generateUUID()}`,
			content: comment.content,
			user_id: comment.user_id,
			post_id: comment.post_id,
		},
	})
}

export const getComments = async (postId: string, query: QueryParams) => {
	const { page = '1', perPage = '10' } = query
	return db.comment.findMany({
		where: {
			post_id: postId,
			parent_id: {
				equals: null,
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
		skip: (Number(page) - 1) * Number(perPage),
		take: Number(perPage),
	})
}

export const getCommentsCount = async (postId: string) => {
	return db.comment.count({
		where: {
			post_id: postId,
		},
	})
}

export const updateCommentOrReply = async (
	commentId: string,
	comment: Comment,
) => {
	return db.comment.update({
		where: {
			id: commentId,
		},
		data: {
			...comment,
		},
	})
}

export const deleteCommentOrReply = async (commentId: string) => {
	return db.comment.delete({
		where: {
			id: commentId,
		},
	})
}

export const createReply = async (comment: Comment) => {
	return db.comment.create({
		data: {
			id: `comment-${generateUUID()}`,
			content: comment.content,
			user_id: comment.user_id,
			post_id: comment.post_id,
			parent_id: comment.parent_id,
		},
	})
}

export const getReplies = async (commentId: string, query: QueryParams) => {
	const { page = '1', perPage = '10' } = query
	return db.comment.findMany({
		where: {
			parent_id: commentId,
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
		skip: (Number(page) - 1) * Number(perPage),
		take: Number(perPage),
	})
}

export const getRepliesCount = async (commentId: string) => {
	return db.comment.count({
		where: {
			parent_id: commentId,
		},
	})
}

export const getComment = async (commentId: string) => {
	return db.comment.findUnique({
		where: {
			id: commentId,
		},
	})
}
