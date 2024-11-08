import type { Post } from '../../prisma/client'
import type { ISearchUser, ISearchUserDTO } from '../user/user.interface'

export interface IPost extends Post {
	user: ISearchUser
}

export interface IPostDTO {
	id: string
	content: string
	created_at: Date
	updated_at: Date
	user: ISearchUserDTO
}
