import { type OpenAPIV3 } from 'openapi-types'

import {
	customParameter,
	customRequestBodyWithFile,
	customResponse,
	EXAMPLE_RESPONSE,
	TypeFile,
} from '../utils'

export const productFilePath: OpenAPIV3.PathsObject = {
	'/products/files/{productId}/upload': {
		post: {
			tags: ['ProductFile'],
			summary: 'Endpont for upload product file',
			description: 'Endpoint to upload an image file (JPEG, JPG, or PNG)',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'productId', 'Unique id from product'),
			],
			requestBody: customRequestBodyWithFile,
			responses: {
				'201': customResponse('Created', EXAMPLE_RESPONSE.PRODUCT_FILE_CREATED),
			},
		},
	},
	'/products/files/{productFileId}/upload': {
		patch: {
			tags: ['ProductFile'],
			summary: 'Endpoint for update product file',
			description: 'Endpoint to upload an image file (JPEG, JPG, or PNG)',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'productFileId', 'Unique id from product file'),
			],
			requestBody: customRequestBodyWithFile,
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.PRODUCT_FILE_UPDATED),
			},
		},
	},
	'/products/files/{productFileId}': {
		delete: {
			tags: ['ProductFile'],
			summary: 'Endpoint for delete product file',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'productFileId', 'Unique id from product file'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.PRODUCT_FILE_DELETED),
			},
		},
	},
	'/products/files/{filename}': {
		get: {
			tags: ['ProductFile'],
			summary: 'Endpoint for get product file',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'filename', 'filename from product file'),
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
