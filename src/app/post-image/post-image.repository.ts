import { db, generateUUID } from '../../utils'

import type { ICreatePostImage, IUpdatePostImage } from './post-image.interface'

export const createPostImage = async (postImage: ICreatePostImage) => {
	return db.postImage.create({
		data: {
			id: `post-image-${generateUUID()}`,
			public_id: postImage.public_id,
			file_url: postImage.file_url,
			filename: postImage.filename,
			size: postImage.size,
			post_id: postImage.post_id,
		},
	})
}

export const getPostImage = async (postImageId: string) => {
	return db.postImage.findUnique({
		where: {
			id: postImageId,
		},
	})
}

export const updatePostImage = async (
	postImageId: string,
	postImage: IUpdatePostImage,
) => {
	return db.postImage.update({
		where: {
			id: postImageId,
		},
		data: {
			...postImage,
		},
	})
}

export const deletePostImage = async (postImageId: string) => {
	return db.postImage.delete({
		where: {
			id: postImageId,
		},
	})
}
