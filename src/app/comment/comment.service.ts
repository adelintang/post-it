import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import type { Comment } from '../../prisma/client'
import { MESSAGE, metaPagination } from '../../utils'
import * as postRepository from '../post/post.repository'
import * as userRepository from '../user/user.repository'

import type { IComment, IReply } from './comment.interface'
import { commentsDTOMapper, repliesDTOMapper } from './comment.mapper'
import * as commentRepository from './comment.repository'

export const createComment = async (data: Comment) => {
	const user = await userRepository.getUser(data.user_id)
	if (!user) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.USER)
	}
	const post = await postRepository.getPost(data.post_id)
	if (!post) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.POST)
	}
	const comment = await commentRepository.createComment(data)
	if (!comment) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.COMMENT,
		)
	}
	return comment
}

export const getComments = async (postId: string, query: QueryParams) => {
	const { page = '1', perPage = '10' } = query
	const [comments, totalData] = await Promise.all([
		commentRepository.getComments(postId, query),
		commentRepository.getCommentsCount(postId),
	])
	const meta = metaPagination(
		Number(page),
		Number(perPage),
		comments.length,
		totalData,
	)
	return { data: commentsDTOMapper(comments as IComment[]), meta }
}

export const updateCommentOrReply = async (
	commentId: string,
	data: Comment,
) => {
	const comment = await commentRepository.getComment(commentId)
	if (!comment) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.COMMENT,
		)
	}
	const commentUpdated = await commentRepository.updateCommentOrReply(
		commentId,
		data,
	)
	if (!commentUpdated) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.UPDATED.COMMENT,
		)
	}
	return commentUpdated
}

export const deleteCommentOrReply = async (commentId: string) => {
	const comment = await commentRepository.getComment(commentId)
	if (!comment) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.COMMENT,
		)
	}
	const commentDeleted = await commentRepository.deleteCommentOrReply(commentId)
	if (!commentDeleted) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.COMMENT,
		)
	}
	return commentDeleted
}

export const createReply = async (data: Comment) => {
	const user = await userRepository.getUser(data.user_id)
	if (!user) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.USER)
	}
	const post = await postRepository.getPost(data.post_id)
	if (!post) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.POST)
	}
	const parent = await commentRepository.getComment(
		data.parent_id as unknown as string,
	)
	if (!parent) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.COMMENT,
		)
	}
	const reply = await commentRepository.createReply(data)
	if (!reply) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.REPLY,
		)
	}
	return reply
}

export const getReplies = async (commentId: string, query: QueryParams) => {
	const { page = '1', perPage = '10' } = query
	const [replies, totalData] = await Promise.all([
		commentRepository.getReplies(commentId, query),
		commentRepository.getRepliesCount(commentId),
	])
	const meta = metaPagination(
		Number(page),
		Number(perPage),
		replies.length,
		totalData,
	)
	return { data: repliesDTOMapper(replies as IReply[]), meta }
}
