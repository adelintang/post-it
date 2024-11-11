import type { OpenAPIV3 } from 'openapi-types'

import {
	customParameter,
	customRequestBodyWithFile,
	customResponse,
	EXAMPLE_RESPONSE,
	TypeFile,
} from '../utils'

export const profileImagePath: OpenAPIV3.PathsObject = {
	'/profiles/files/{profileId}/upload': {
		post: {
			tags: ['Profile Image'],
			summary: 'Endpoint for upload profile image',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'profileId', 'Unique id from profile'),
			],
			requestBody: customRequestBodyWithFile,
			responses: {
				'201': customResponse(
					'Created',
					EXAMPLE_RESPONSE.PROFILE_IMAGE_CREATED,
				),
			},
		},
	},
	'/profiles/files/{profileImageId}/upload': {
		patch: {
			tags: ['Profile Image'],
			summary: 'Endpoint for update profile image',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter(
					'path',
					'profileImageId',
					'Unique id from profile image',
				),
			],
			requestBody: customRequestBodyWithFile,
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.PROFILE_IMAGE_UPDATED),
			},
		},
	},
	'/profiles/files/{profileImageId}': {
		delete: {
			tags: ['Profile Image'],
			summary: 'Endpoint for delete profile image',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter(
					'path',
					'profileImageId',
					'Unique id from profile image',
				),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.PROFILE_IMAGE_DELETED),
			},
		},
	},
	'/profiles/files/{filename}': {
		get: {
			tags: ['Profile Image'],
			summary: 'Endpoint for get profile image',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'filename', 'Filename from profile image'),
			],
			responses: {
				'200': {
					description: 'OK',
					content: {
						'image/jpeg': {
							schema: TypeFile,
						},
						'image/jpg': {
							schema: TypeFile,
						},
						'image/png': {
							schema: TypeFile,
						},
					},
				},
			},
		},
	},
}
