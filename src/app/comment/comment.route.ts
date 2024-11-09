import { Router } from 'express'

import { isOwnerComment, validateRequest } from '../../middleware'
import { catchAsync } from '../../utils'

import {
	updateCommentOrReply,
	deleteCommentOrReply,
	createReply,
	getReplies,
} from './comment.controller'
import { createReplySchema, updateCommentSchema } from './comment.request'

const route = Router()

route.get('/:commentId/replies', catchAsync(getReplies))
route.post(
	'/replies',
	validateRequest(createReplySchema),
	catchAsync(createReply),
)
route.patch(
	'/:commentId',
	isOwnerComment,
	validateRequest(updateCommentSchema),
	catchAsync(updateCommentOrReply),
)
route.delete('/:commentId', isOwnerComment, catchAsync(deleteCommentOrReply))

export default route
