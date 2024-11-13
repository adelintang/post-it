import { Router } from 'express'

import {
	isOwnerPost,
	isOwnerPostImage,
	validateRequest,
} from '../../middleware'
import { catchAsync, upload } from '../../utils'
import { createComment, getComments } from '../comment/comment.controller'
import { createCommentSchema } from '../comment/comment.request'
import {
	likePost,
	unlikePost,
	getWhoLikesPost,
	getLikePost,
} from '../like/like.controller'
import {
	createPostImage,
	updatePostImage,
	deletePostImage,
} from '../post-image/post-image.controller'

import {
	createPost,
	getPosts,
	getPost,
	updatePost,
	deletePost,
	getPostsMe,
} from './post.controller'
import { createPostSchema, updatePostSchema } from './post.request'

const route = Router()

route.post(
	'/files/:postId/upload',
	isOwnerPost,
	upload.single('file'),
	catchAsync(createPostImage),
)
route.patch(
	'/files/:postImageId/upload',
	isOwnerPostImage,
	upload.single('file'),
	catchAsync(updatePostImage),
)
route.delete(
	'/files/:postImageId',
	isOwnerPostImage,
	catchAsync(deletePostImage),
)

route.get('/:postId/comments', catchAsync(getComments))
route.post(
	'/comments',
	validateRequest(createCommentSchema),
	catchAsync(createComment),
)

route.get('/:postId/like/check', catchAsync(getLikePost))
route.post('/:postId/like', catchAsync(likePost))
route.delete('/:postId/unlike', catchAsync(unlikePost))
route.get('/:postId/likes', catchAsync(getWhoLikesPost))

route.get('/me', catchAsync(getPostsMe))
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
