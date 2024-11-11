import joiToSwagger from 'joi-to-swagger'
import type { OpenAPIV3 } from 'openapi-types'

import { createPostSchema, updatePostSchema } from '../../app/post/post.request'
import {
	customParameter,
	customRequestBody,
	customResponse,
	EXAMPLE_RESPONSE,
} from '../utils'

const createPostSwaggerSchema = joiToSwagger(createPostSchema).swagger
const updatePostSwaggerSchema = joiToSwagger(updatePostSchema).swagger

export const postPath: OpenAPIV3.PathsObject = {
	'/posts': {
		post: {
			tags: ['Post'],
			summary: 'Endpoint for create post',
			security: [{ bearerAuth: [] }],
			requestBody: customRequestBody(true, createPostSwaggerSchema),
			responses: {
				'201': customResponse('Created', EXAMPLE_RESPONSE.POST_CREATED),
			},
		},
		get: {
			tags: ['Post'],
			summary: 'Endpoint for get all post',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('query', 'search', 'Search by content')],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.POSTS_GET),
			},
		},
	},
	'/posts/me': {
		get: {
			tags: ['Post'],
			summary: 'Endpoint for get all my post',
			security: [{ bearerAuth: [] }],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.POSTS_ME_GET),
			},
		},
	},
	'/posts/{postId}': {
		get: {
			tags: ['Post'],
			summary: 'Endpoint for get post by postId',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('path', 'postId', 'Unique id from post')],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.POST_GET),
			},
		},
		patch: {
			tags: ['Post'],
			summary: 'Endpoint for update post',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('path', 'postId', 'Unique id from post')],
			requestBody: customRequestBody(false, updatePostSwaggerSchema),
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.POST_UPDATED),
			},
		},
		delete: {
			tags: ['Post'],
			summary: 'Endpoint for delete post',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('path', 'postId', 'Unique id from post')],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.POST_DELETED),
			},
		},
	},
}
