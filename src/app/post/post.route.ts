import { Router } from 'express'

import { DIRECTORY_NAME } from '../../interface'
import {
	isOwnerPost,
	isOwnerPostImage,
	validateRequest,
} from '../../middleware'
import { catchAsync, storageConfig, uploadConfig } from '../../utils'
import {
	createPostImage,
	updatePostImage,
	deletePostImage,
	getPostImage,
} from '../post-image/post-image.controller'

import {
	createPost,
	getPosts,
	getPost,
	updatePost,
	deletePost,
} from './post.controller'
import { createPostSchema, updatePostSchema } from './post.request'

const route = Router()

const storage = storageConfig(DIRECTORY_NAME.POST)
const upload = uploadConfig(storage)

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
route.get('/files/:filename', catchAsync(getPostImage))

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
