import type { Post, PostImage } from '../../prisma/client'
import type { ICount } from '../comment/comment.interface'
import type { IPostImageInPostDTO } from '../post-image/post-image.interface'
import type { ISearchUser, ISearchUserDTO } from '../user/user.interface'

export interface IPost extends Post {
	user: ISearchUser
	postImage: PostImage
	_count: ICount
}

export interface IPostDTO {
	id: string
	content: string
	created_at: Date
	updated_at: Date
	user: ISearchUserDTO
	post_image: IPostImageInPostDTO | null
	likesCount?: number
	commentsCount?: number
}
