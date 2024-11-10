import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import type { Like } from '../../prisma/client'
import { MESSAGE } from '../../utils'
import * as commentRepository from '../comment/comment.repository'
import * as postRepository from '../post/post.repository'
import * as userRepository from '../user/user.repository'

import type { IWhoLikes } from './like.interface'
import { whoLikesDTOMapper } from './like.mapper'
import * as likeRepository from './like.repository'

export const likePost = async (postId: string, userId: string) => {
	const user = await userRepository.getUser(userId)
	if (!user) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.USER)
	}
	const post = await postRepository.getPost(postId)
	if (!post) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.POST)
	}
	const alreadyLiked = await likeRepository.getLikePost(postId, userId)
	if (alreadyLiked) {
		return new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.BAD_REQUEST.LIKE_POST,
		)
	}
	const data = { post_id: postId, user_id: userId }
	const likePost = await likeRepository.likePost(data as Like)
	if (!likePost) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.LIKE_POST,
		)
	}
	return likePost
}

export const unlikePost = async (postId: string, userId: string) => {
	const alreadyLiked = await likeRepository.getLikePost(postId, userId)
	if (!alreadyLiked) {
		return new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.BAD_REQUEST.UNLIKE_POST,
		)
	}
	const verify = alreadyLiked.user_id === userId
	if (!verify) {
		return new AppError(ERROR_CODE.FORBIDDEN.code, MESSAGE.ERROR.FORBIDDEN)
	}
	const unlikePost = await likeRepository.unlikePost(alreadyLiked.id)
	if (!unlikePost) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.UNLIKE_POST,
		)
	}
	return unlikePost
}

export const getWhoLikesPost = async (postId: string, query: QueryParams) => {
	const whoLikesPost = await likeRepository.getWhoLikesPost(postId, query)
	return whoLikesDTOMapper(whoLikesPost as IWhoLikes[])
}

export const getLikePost = async (postId: string, userId: string) => {
	const post = await postRepository.getPost(postId)
	if (!post) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.POST)
	}
	const like = await likeRepository.getLikePost(postId, userId)
	if (!like) {
		return { like: false }
	}
	return { like: true }
}

export const likeComment = async (commentId: string, userId: string) => {
	const user = await userRepository.getUser(userId)
	if (!user) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.USER)
	}
	const comment = await commentRepository.getComment(commentId)
	if (!comment) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.COMMENT,
		)
	}
	const alreadyLiked = await likeRepository.getLikeComment(commentId, userId)
	if (alreadyLiked) {
		return new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.BAD_REQUEST.LIKE_COMMENT,
		)
	}
	const data = { comment_id: commentId, user_id: userId }
	const likeComment = await likeRepository.likeComment(data as Like)
	if (!likeComment) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.LIKE_COMMENT,
		)
	}
	return likeComment
}

export const unlikeComment = async (commentId: string, userId: string) => {
	const alreadyLiked = await likeRepository.getLikeComment(commentId, userId)
	if (!alreadyLiked) {
		return new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.BAD_REQUEST.UNLIKE_COMMENT,
		)
	}
	const verify = alreadyLiked.user_id === userId
	if (!verify) {
		return new AppError(ERROR_CODE.FORBIDDEN.code, MESSAGE.ERROR.FORBIDDEN)
	}
	const unlikeComment = await likeRepository.unlikeComment(alreadyLiked.id)
	if (!unlikeComment) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.UNLIKE_COMMENT,
		)
	}
	return unlikeComment
}

export const getLikeComment = async (commentId: string, userId: string) => {
	const comment = await commentRepository.getComment(commentId)
	if (!comment) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.COMMENT,
		)
	}
	const like = await likeRepository.getLikeComment(commentId, userId)
	if (!like) {
		return { like: false }
	}
	return { like: true }
}
