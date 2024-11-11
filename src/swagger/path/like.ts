import type { OpenAPIV3 } from 'openapi-types'

import { customParameter, customResponse, EXAMPLE_RESPONSE } from '../utils'

export const likePath: OpenAPIV3.PathsObject = {
	'/posts/{postId}/like': {
		post: {
			tags: ['Like'],
			summary: 'Endpoint for like post',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('path', 'postId', 'Unique id from post')],
			responses: {
				'201': customResponse('Created', EXAMPLE_RESPONSE.LIKE_POST),
			},
		},
	},
	'/posts/{postId}/unlike': {
		delete: {
			tags: ['Like'],
			summary: 'Endpoint for unlike post',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('path', 'postId', 'Unique id from post')],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.UNLIKE_POST),
			},
		},
	},
	'/posts/{postId}/likes': {
		get: {
			tags: ['Like'],
			summary: 'Endpoint for get all user who liked post',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'postId', 'Unique id from post'),
				customParameter('query', 'search', 'search by username'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.WHO_LIKES_POST),
			},
		},
	},
	'/posts/{postId}/like/check': {
		get: {
			tags: ['Like'],
			summary: 'Endpoint for get liked post checked',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('path', 'postId', 'Unique id from post')],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.LIKE_POST_CHECK),
			},
		},
	},
	'/comments/{commentId}/like': {
		post: {
			tags: ['Like'],
			summary: 'Endpoint for like comment',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'commentId', 'Unique id from comment'),
			],
			responses: {
				'201': customResponse('Created', EXAMPLE_RESPONSE.LIKE_COMMENT),
			},
		},
	},
	'/comments/{commentId}/unlike': {
		delete: {
			tags: ['Like'],
			summary: 'Endpoint for unlike comment',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'commentId', 'Unique id from comment'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.UNLIKE_COMMENT),
			},
		},
	},
	'/comments/{commentId}/like/check': {
		get: {
			tags: ['Like'],
			summary: 'Endpoint for get liked comment checked',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'commentId', 'Unique id from comment'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.LIKE_COMMENT_CHECK),
			},
		},
	},
}
