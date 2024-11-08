import type { PostImage } from '../../prisma/client'

import type { IDeletePostImageDTO, IPostImageDTO } from './post-image.interface'

export const postImageDTOMapper = (postImage: PostImage): IPostImageDTO => {
	return {
		id: postImage.id,
		file_url: postImage.file_url,
		filename: postImage.filename,
		size: postImage.size,
		post_id: postImage.post_id,
	}
}

export const deletePostImageDTOMapper = (
	postImage: PostImage,
): IDeletePostImageDTO => {
	return {
		id: postImage.id,
		post_id: postImage.post_id,
	}
}
