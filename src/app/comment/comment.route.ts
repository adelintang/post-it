import { Router } from 'express'

import { isOwnerComment, validateRequest } from '../../middleware'
import { catchAsync } from '../../utils'
import {
	likeComment,
	unlikeComment,
	getLikeComment,
} from '../like/like.controller'

import {
	updateCommentOrReply,
	deleteCommentOrReply,
	createReply,
	getReplies,
	getComment,
} from './comment.controller'
import { createReplySchema, updateCommentSchema } from './comment.request'

const route = Router()

route.get('/:commentId/replies', catchAsync(getReplies))
route.post(
	'/replies',
	validateRequest(createReplySchema),
	catchAsync(createReply),
)

route.get('/:commentId/like/check', catchAsync(getLikeComment))
route.post('/:commentId/like', catchAsync(likeComment))
route.delete('/:commentId/unlike', catchAsync(unlikeComment))

route.get('/:commentId', catchAsync(getComment))
route.patch(
	'/:commentId',
	isOwnerComment,
	validateRequest(updateCommentSchema),
	catchAsync(updateCommentOrReply),
)
route.delete('/:commentId', isOwnerComment, catchAsync(deleteCommentOrReply))

export default route
