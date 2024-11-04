import joiToSwagger from 'joi-to-swagger'
import { type OpenAPIV3 } from 'openapi-types'

import {
	createProductSchema,
	updateProductSchema,
} from '../../app/product/product.request'
import {
	customParameter,
	customRequestBody,
	customResponse,
	EXAMPLE_RESPONSE,
} from '../utils'

const createSwaggerProductSchema = joiToSwagger(createProductSchema).swagger
const updateSwaggerProductSchema = joiToSwagger(updateProductSchema).swagger

export const productPath: OpenAPIV3.PathsObject = {
	'/products': {
		post: {
			tags: ['Product'],
			summary: 'Endpoint for create product',
			security: [{ bearerAuth: [] }],
			requestBody: customRequestBody(true, createSwaggerProductSchema),
			responses: {
				'201': customResponse('Created', EXAMPLE_RESPONSE.PRODUCT_CREATED),
			},
		},
		get: {
			tags: ['Product'],
			summary: 'Endpoint for get all product',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('query', 'search', 'Search product by name'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.PRODUCTS_GET),
			},
		},
	},
	'/products/{productId}': {
		get: {
			tags: ['Product'],
			summary: 'Endpoint for get product by id',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'productId', 'Unique id from product'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.PRODUCT_GET),
			},
		},
		patch: {
			tags: ['Product'],
			summary: 'Endpoint for update product by id',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'productId', 'Unique id from product'),
			],
			requestBody: customRequestBody(false, updateSwaggerProductSchema),
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.PRODUCT_UPDATED),
			},
		},
		delete: {
			tags: ['Product'],
			summary: 'Endpoint for delete product by id',
			security: [{ bearerAuth: [] }],
			parameters: [
				customParameter('path', 'productId', 'Unique id from product'),
			],
			responses: {
				'200': customResponse('OK', EXAMPLE_RESPONSE.PRODUCT_DELETED),
			},
		},
	},
}
