import joiToSwagger from 'joi-to-swagger'
import type { OpenAPIV3 } from 'openapi-types'

import { followSchema, unfollowSchema } from '../../app/follow/follow.request'
import {
	customParameter,
	customRequestBody,
	customResponse,
	EXAMPLE_RESPONSE,
} from '../utils'

const followSwaggerSchema = joiToSwagger(followSchema).swagger
const unfollowSwaggerSchema = joiToSwagger(unfollowSchema).swagger

export const followPath: OpenAPIV3.PathsObject = {
	'/users/follow': {
		post: {
			tags: ['Follow'],
			summary: 'Endpoint for following other user',
			security: [{ bearerAuth: [] }],
			requestBody: customRequestBody(true, followSwaggerSchema),
			responses: {
				'201': customResponse('Created', EXAMPLE_RESPONSE.FOLLOWING),
			},
		},
	},
	'/users/unfollow': {
		delete: {
			tags: ['Follow'],
			summary: 'Endpoint for unfollowing other user',
			security: [{ bearerAuth: [] }],
			requestBody: customRequestBody(true, unfollowSwaggerSchema),
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.UNFOLLOW),
			},
		},
	},
	'/users/followers/{userId}': {
		get: {
			tags: ['Follow'],
			summary: 'Endpoint for get followers user',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'userId', 'Unique id from user'),
				customParameter('query', 'search', 'Search by username'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.FOLLOWERS_GET),
			},
		},
	},
	'/users/followings/{userId}': {
		get: {
			tags: ['Follow'],
			summary: 'Endpoint for get following user',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'userId', 'Unique id from user'),
				customParameter('query', 'search', 'Search by username'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.FOLLOWINGS_GET),
			},
		},
	},
	'/users/follows/count/{userId}': {
		get: {
			tags: ['Follow'],
			summary: 'Endpoint for get all follower and follower user count',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('path', 'userId', 'Unique id from user')],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.FOLLOWS_COUNT_GET),
			},
		},
	},
}
