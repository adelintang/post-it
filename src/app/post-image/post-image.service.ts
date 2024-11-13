import { ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'
import {
	MESSAGE,
	uploadImageCloudinary,
	updateImageCloudinary,
	deleteImageCloudinary,
} from '../../utils'
import * as postRepository from '../post/post.repository'

import type { ICreatePostImage, IUpdatePostImage } from './post-image.interface'
import {
	deletePostImageDTOMapper,
	postImageDTOMapper,
} from './post-image.mapper'
import * as postImageRepository from './post-image.repository'

export const createPostImage = async (
	postId: string,
	file: Express.Multer.File,
) => {
	const post = await postRepository.getPost(postId)
	if (!post) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.POST)
	}
	const upload = await uploadImageCloudinary(file.path, 'post')
	if (!upload) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.POST_IMAGE,
		)
	}
	const postImage: ICreatePostImage = {
		public_id: upload.public_id,
		filename: `${upload.public_id}.${upload.format}`,
		size: upload.bytes,
		file_url: upload.secure_url,
		post_id: postId,
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
) => {
	const postImage = await postImageRepository.getPostImage(postImageId)
	if (!postImage) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.POST_IMAGE,
		)
	}
	const upload = await updateImageCloudinary(file.path, postImage.public_id)
	if (!upload) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.UPDATED.POST_IMAGE,
		)
	}
	const updatePostImage: IUpdatePostImage = {
		filename: `${upload.public_id}.${upload.format}`,
		size: upload.bytes,
		file_url: upload.secure_url,
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
	const deleteFile = await deleteImageCloudinary(postImage.public_id)
	if (!deleteFile) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.POST_IMAGE,
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
	return deletePostImageDTOMapper(postImageDeleted)
}
