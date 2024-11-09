import type { Comment } from '../../prisma/client'
import type { ISearchUser, ISearchUserDTO } from '../user/user.interface'

export interface ICount {
	comments: number
}

export interface IComment extends Comment {
	user: ISearchUser
	_count: ICount
}

export interface IReply extends IComment {}

export interface ICommentDTO {
	id: string
	content: string
	created_at: Date
	updated_at: Date
	user: ISearchUserDTO
	repliesCount?: number
}

export interface IReplyDTO {
	id: string
	content: string
	created_at: Date
	updated_at: Date
	parent_id: string | null
	user: ISearchUserDTO
}
