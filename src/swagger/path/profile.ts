import joiToSwagger from 'joi-to-swagger'
import type { OpenAPIV3 } from 'openapi-types'

import {
	createProfileSchema,
	updateProfileSchema,
} from '../../app/profile/profile.request'
import {
	customParameter,
	customRequestBody,
	customResponse,
	EXAMPLE_RESPONSE,
} from '../utils'

const createProfileSwaggerSchema = joiToSwagger(createProfileSchema).swagger
const updateProfileSwaggerSchema = joiToSwagger(updateProfileSchema).swagger

export const profilePath: OpenAPIV3.PathsObject = {
	'/profiles': {
		post: {
			tags: ['Profile'],
			summary: 'Endpoint for create profile',
			security: [{ bearerAuth: [] }],
			requestBody: customRequestBody(true, createProfileSwaggerSchema),
			responses: {
				'201': customResponse('Created', EXAMPLE_RESPONSE.PROFILE_CREATED),
			},
		},
	},
	'/profiles/{profileId}': {
		get: {
			tags: ['Profile'],
			summary: 'Endpoint for get profile',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'profileId', 'Unique id from profile'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.PROFILE_GET),
			},
		},
		patch: {
			tags: ['Profile'],
			summary: 'Endpoint for update profile',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'profileId', 'Unique id from profile'),
			],
			requestBody: customRequestBody(false, updateProfileSwaggerSchema),
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.PROFILE_UPDATED),
			},
		},
	},
}
