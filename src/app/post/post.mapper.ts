import { postImageInPostDTOMapper } from '../post-image/post-image.mapper'
import { searchUserDTOMapper } from '../user/user.mapper'

import type { IPost, IPostDTO } from './post.interface'

export const postsDTOMapper = (posts: IPost[]): IPostDTO[] => {
	return posts.map((post) => {
		return {
			...postDTOMapper(post),
			likesCount: post._count.likes,
			commentsCount: post._count.comments,
		}
	})
}

export const postDTOMapper = (post: IPost): IPostDTO => {
	return {
		id: post.id,
		content: post.content,
		created_at: post.created_at,
		updated_at: post.updated_at,
		user: searchUserDTOMapper(post.user),
		post_image: post.postImage
			? postImageInPostDTOMapper(post.postImage)
			: null,
	}
}
