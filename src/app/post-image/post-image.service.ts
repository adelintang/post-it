import { ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'
import { deleteFile, MESSAGE } from '../../utils'
import * as postRepository from '../post/post.repository'

import type { ICreatePostImage, IUpdatePostImage } from './post-image.interface'
import {
	deletePostImageDTOMapper,
	postImageDTOMapper,
} from './post-image.mapper'
import * as postImageRepository from './post-image.repository'

const PORT = process.env.PORT ?? 3000
const HOST = process.env.HOST ?? 'http://localhost'

export const createPostImage = async (
	postId: string,
	file: Express.Multer.File,
	fileUrl: string,
) => {
	const { filename, size, path } = file
	const postImage: ICreatePostImage = {
		filename,
		size,
		path,
		file_url: `${HOST}:${PORT}/posts/files/${fileUrl}`,
		post_id: postId,
	}
	const post = await postRepository.getPost(postId)
	if (!post) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.POST)
	}
	const createPostImage = await postImageRepository.createPostImage(postImage)
	if (!createPostImage) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.POST_IMAGE,
		)
	}
	return postImageDTOMapper(createPostImage)
}

export const updatePostImage = async (
	postImageId: string,
	file: Express.Multer.File,
	fileUrl: string,
) => {
	const { filename, size, path } = file
	const updatePostImage: IUpdatePostImage = {
		filename,
		size,
		path,
		file_url: `${HOST}:${PORT}/posts/files/${fileUrl}`,
	}
	const postImage = await postImageRepository.getPostImage(postImageId)
	if (!postImage) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.POST_IMAGE,
		)
	}
	const postImageUpdated = await postImageRepository.updatePostImage(
		postImageId,
		updatePostImage,
	)
	if (!postImageUpdated) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.UPDATED.POST_IMAGE,
		)
	}
	await deleteFile(postImage.path)
	return postImageDTOMapper(postImageUpdated)
}

export const deletePostImage = async (postImageId: string) => {
	const postImage = await postImageRepository.getPostImage(postImageId)
	if (!postImage) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.POST_IMAGE,
		)
	}
	const postImageDeleted =
		await postImageRepository.deletePostImage(postImageId)
	if (!postImageDeleted) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.POST_IMAGE,
		)
	}
	await deleteFile(postImage.path)
	return deletePostImageDTOMapper(postImageDeleted)
}
