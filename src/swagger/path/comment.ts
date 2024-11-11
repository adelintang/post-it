import joiToSwagger from 'joi-to-swagger'
import type { OpenAPIV3 } from 'openapi-types'

import {
	createCommentSchema,
	createReplySchema,
	updateCommentSchema,
} from '../../app/comment/comment.request'
import {
	customParameter,
	customRequestBody,
	customResponse,
	EXAMPLE_RESPONSE,
} from '../utils'

const createCommentSwaggerSchema = joiToSwagger(createCommentSchema).swagger
const updateCommentSwaggerSchema = joiToSwagger(updateCommentSchema).swagger
const createReplySwaggerSchema = joiToSwagger(createReplySchema).swagger

export const commentPath: OpenAPIV3.PathsObject = {
	'/posts/comments': {
		post: {
			tags: ['Comment'],
			summary: 'Endpoint for create comment',
			security: [{ bearerAuth: [] }],
			requestBody: customRequestBody(true, createCommentSwaggerSchema),
			responses: {
				'201': customResponse('Created', EXAMPLE_RESPONSE.COMMENT_CREATED),
			},
		},
	},
	'/posts/{postId}/comments': {
		get: {
			tags: ['Comment'],
			summary: 'Endpoint for get all comment',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('path', 'postId', 'Unique id from post')],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.COMMENTS_GET),
			},
		},
	},
	'/comments/{commentId}': {
		get: {
			tags: ['Comment'],
			summary: 'Endpoint for get comment',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'commentId', 'Unique id from comment'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.COMMENT_GET),
			},
		},
		patch: {
			tags: ['Comment'],
			summary: 'Endpoint for update comment or reply',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'commentId', 'Unique id from comment'),
			],
			requestBody: customRequestBody(false, updateCommentSwaggerSchema),
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.COMMENT_UPDATED),
			},
		},
		delete: {
			tags: ['Comment'],
			summary: 'Endpoint for delete comment or reply',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'commentId', 'Unique id from comment'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.COMMENT_DELETED),
			},
		},
	},
	'/comments/replies': {
		post: {
			tags: ['Comment'],
			summary: 'Endpoint for create reply',
			security: [{ bearerAuth: [] }],
			requestBody: customRequestBody(true, createReplySwaggerSchema),
			responses: {
				'201': customResponse('Created', EXAMPLE_RESPONSE.REPLY_CREATED),
			},
		},
	},
	'/comments/{commentId}/replies': {
		get: {
			tags: ['Comment'],
			summary: 'Endpoint for get all reply',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'commentId', 'Unique id from comment'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.REPLIES_GET),
			},
		},
	},
}
