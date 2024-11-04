import { type OpenAPIV3 } from 'openapi-types'

import { customParameter, customResponse, EXAMPLE_RESPONSE } from '../utils'

export const userPath: OpenAPIV3.PathsObject = {
	'/users': {
		get: {
			tags: ['User'],
			summary: 'Endpoint for get all user',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('query', 'search', 'Search user by name')],
			// parameters: [
			// {
			// 	name: 'Authorization',
			// 	in: 'header',
			// 	required: true,
			// 	schema: {
			// 		type: 'string',
			// 		example: `Bearer ${fakeToken}`,
			// 	},
			// 	description: 'Bearer token for authorization',
			// },
			// ],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.USERS_GET),
			},
		},
	},
	'/users/{userId}': {
		get: {
			tags: ['User'],
			summary: 'Endpoint for get user by id',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('path', 'userId', 'Unique id from user')],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.USER_GET),
			},
		},
	},
}
