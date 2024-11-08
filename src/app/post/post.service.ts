import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import type { Post } from '../../prisma/client'
import { MESSAGE, metaPagination } from '../../utils'
import * as userRepository from '../user/user.repository'

import type { IPost } from './post.interface'
import { postDTOMapper, postsDTOMapper } from './post.mapper'
import * as postRepository from './post.repository'

export const createPost = async (data: Post) => {
	const user = await userRepository.getUser(data.user_id)
	if (!user) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.USER)
	}
	const post = await postRepository.createPost(data)
	if (!post) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.POST,
		)
	}
	return post
}

export const getPosts = async (query: QueryParams) => {
	const { page = '1', perPage = '10' } = query
	const [posts, totalData] = await Promise.all([
		postRepository.getPosts(query),
		postRepository.getPostsCount(query),
	])
	const meta = metaPagination(
		Number(page),
		Number(perPage),
		posts.length,
		totalData,
	)
	return { data: postsDTOMapper(posts as IPost[]), meta }
}

export const getPost = async (postId: string) => {
	const post = await postRepository.getPost(postId)
	if (!post) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.POST)
	}
	return postDTOMapper(post as IPost)
}

export const updatePost = async (postId: string, data: Post) => {
	const post = await postRepository.getPost(postId)
	if (!post) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.POST)
	}
	const postUpdated = await postRepository.updatePost(postId, data)
	if (!postUpdated) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.UPDATED.POST,
		)
	}
	return postUpdated
}

export const deletePost = async (postId: string) => {
	const post = await postRepository.getPost(postId)
	if (!post) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.POST)
	}
	const postDeleted = await postRepository.deletePost(postId)
	if (!postDeleted) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.POST,
		)
	}
	return postDeleted
}
