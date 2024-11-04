import joiToSwagger from 'joi-to-swagger'
import { type OpenAPIV3 } from 'openapi-types'

import { loginSchema, registerSchema } from '../../app/auth/auth.request'
import {
	customParameter,
	customRequestBody,
	customResponse,
	EXAMPLE_RESPONSE,
	fakeToken,
} from '../utils'

const registerSwaggerSchema = joiToSwagger(registerSchema).swagger
const loginSwaggerSchema = joiToSwagger(loginSchema).swagger

export const authPath: OpenAPIV3.PathsObject = {
	'/auth/register': {
		post: {
			tags: ['Auth'],
			summary: 'Endpoint for create user account',
			requestBody: customRequestBody(true, registerSwaggerSchema),
			responses: {
				'201': customResponse('Created', EXAMPLE_RESPONSE.REGISTER),
			},
		},
	},
	'/auth/login': {
		post: {
			tags: ['Auth'],
			summary: 'Endpoint for user authenticate',
			requestBody: customRequestBody(true, loginSwaggerSchema),
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.LOGIN),
			},
		},
	},
	'/auth/refresh-token': {
		post: {
			tags: ['Auth'],
			summary: 'Endpoint for get new Access Token',
			parameters: [
				customParameter(
					'cookie',
					'refreshToken',
					'refresh token needed for generating new access token',
					`Bearer ${fakeToken}`,
				),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.REFRESH_TOKEN),
			},
		},
	},
	'/auth/logout': {
		delete: {
			tags: ['Auth'],
			summary: 'Endpoint for logout',
			parameters: [
				customParameter(
					'cookie',
					'refreshToken',
					'Delete refresh token for logout',
					`Bearer ${fakeToken}`,
				),
			],
			responses: {
				'204': {
					description: 'No Content',
				},
			},
		},
	},
}
