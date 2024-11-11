import type { OpenAPIV3 } from 'openapi-types'

import {
	customParameter,
	customRequestBodyWithFile,
	customResponse,
	EXAMPLE_RESPONSE,
	TypeFile,
} from '../utils'

export const postImagePath: OpenAPIV3.PathsObject = {
	'/posts/files/{postId}/upload': {
		post: {
			tags: ['Post Image'],
			summary: 'Endpoint for upload post image',
			security: [{ bearerAuth: [] }],
			parameters: [customParameter('path', 'postId', 'Unique id from post')],
			requestBody: customRequestBodyWithFile,
			responses: {
				'201': customResponse('Created', EXAMPLE_RESPONSE.POST_IMAGE_CREATED),
			},
		},
	},
	'/posts/files/{postImageId}/upload': {
		patch: {
			tags: ['Post Image'],
			summary: 'Endpoint for update post image',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'postImageId', 'Unique id from post image'),
			],
			requestBody: customRequestBodyWithFile,
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.POST_IMAGE_UPDATED),
			},
		},
	},
	'/posts/files/{postImageId}': {
		delete: {
			tags: ['Post Image'],
			summary: 'Endpoint for delete post image',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'postImageId', 'Unique id from post image'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.POST_IMAGE_DELETED),
			},
		},
	},
	'/posts/files/{filename}': {
		get: {
			tags: ['Post Image'],
			summary: 'Endpoint for get post image',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'filename', 'Filename from post image'),
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
