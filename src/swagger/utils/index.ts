import { type OpenAPIV3 } from 'openapi-types'

import { type IExampleResponse } from './example-response'

type InParams = 'query' | 'path' | 'cookie'
export const TypeFile: OpenAPIV3.SchemaObject = {
	type: 'string',
	format: 'binary',
}

export const customParameter = (
	inParams: InParams,
	name: string,
	description: string,
	example?: string,
): OpenAPIV3.ParameterObject => {
	return {
		in: inParams,
		name,
		description,
		required: inParams !== 'query',
		schema: {
			type: 'string',
			example,
		},
	}
}

export const customRequestBody = (
	required: boolean,
	schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
): OpenAPIV3.RequestBodyObject => {
	return {
		required,
		content: {
			'application/json': {
				schema,
			},
		},
	}
}

export const customRequestBodyWithFile: OpenAPIV3.RequestBodyObject = {
	required: true,
	content: {
		'multipart/form-data': {
			schema: {
				type: 'object',
				properties: {
					file: TypeFile,
				},
				required: ['file'],
			},
		},
	},
}

export const customResponse = (
	code: 'Created' | 'OK',
	example: IExampleResponse,
): OpenAPIV3.ResponseObject => {
	return {
		description: code,
		content: {
			'application/json': {
				schema: {
					example,
				},
			},
		},
	}
}

export * from './example-response'
