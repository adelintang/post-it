import { type OpenAPIV3 } from 'openapi-types'

import { customParameter, customResponse, EXAMPLE_RESPONSE } from '../utils'

export const userPath: OpenAPIV3.PathsObject = {
	'/users': {
		get: {
			tags: ['User'],
			summary: 'Endpoint for get all user',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('query', 'search', 'Search user by username'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.USERS_GET),
			},
		},
	},
}
