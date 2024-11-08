import { Router } from 'express'

import { isOwnerPost, validateRequest } from '../../middleware'
import { catchAsync } from '../../utils'

import {
	createPost,
	getPosts,
	getPost,
	updatePost,
	deletePost,
} from './post.controller'
import { createPostSchema, updatePostSchema } from './post.request'

const route = Router()

route.get('/:postId', catchAsync(getPost))
route.patch(
	'/:postId',
	isOwnerPost,
	validateRequest(updatePostSchema),
	catchAsync(updatePost),
)
route.delete('/:postId', isOwnerPost, catchAsync(deletePost))
route.post('/', validateRequest(createPostSchema), catchAsync(createPost))
route.get('/', catchAsync(getPosts))

export default route
