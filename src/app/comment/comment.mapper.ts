import { searchUserDTOMapper } from '../user/user.mapper'

import type {
	IComment,
	ICommentDTO,
	IReply,
	IReplyDTO,
} from './comment.interface'

export const commentsDTOMapper = (comments: IComment[]): ICommentDTO[] => {
	return comments.map((comment) => {
		return {
			id: comment.id,
			content: comment.content,
			created_at: comment.created_at,
			updated_at: comment.updated_at,
			user: searchUserDTOMapper(comment.user),
		}
	})
}

export const repliesDTOMapper = (replies: IReply[]): IReplyDTO[] => {
	return replies.map((reply) => {
		return {
			id: reply.id,
			content: reply.content,
			created_at: reply.created_at,
			updated_at: reply.updated_at,
			parent_id: reply.parent_id,
			user: searchUserDTOMapper(reply.user),
		}
	})
}
