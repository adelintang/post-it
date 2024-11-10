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
			...commentDTOMapper(comment),
			likesCount: comment._count.likes,
			repliesCount: comment._count.comments,
		}
	})
}

export const commentDTOMapper = (comment: IComment): ICommentDTO => {
	return {
		id: comment.id,
		content: comment.content,
		created_at: comment.created_at,
		updated_at: comment.updated_at,
		user: searchUserDTOMapper(comment.user),
	}
}

export const repliesDTOMapper = (replies: IReply[]): IReplyDTO[] => {
	return replies.map((reply) => {
		return {
			...commentDTOMapper(reply),
			likesCount: reply._count.likes,
			parent_id: reply.parent_id,
		}
	})
}
