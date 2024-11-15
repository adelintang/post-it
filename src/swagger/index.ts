import fs from 'fs'
import path from 'path'

import { type OpenAPIV3 } from 'openapi-types'

import {
	authPath,
	userPath,
	profilePath,
	profileImagePath,
	followPath,
	postPath,
	postImagePath,
	commentPath,
	likePath,
} from './path'

// const PORT = process.env.PORT ?? 3000
const HOST = process.env.HOST ?? 'http://localhost'

export const swaggerDocument: OpenAPIV3.Document = {
	openapi: '3.0.0',
	info: {
		title: 'Post It API Documentation',
		description: 'Documentation for all endpoint are you need to read',
		version: '1.0.0',
	},
	servers: [
		{
			url: HOST,
			description: 'Internal Server API',
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
	},
	tags: [
		{ name: 'Auth', description: 'Endpoints related to Authentication' },
		{ name: 'User', description: 'Endpoints related to User' },
		{ name: 'Profile', description: 'Endpoints related to Profile' },
		{
			name: 'Profile Image',
			description: 'Endpoints related to Profile Image',
		},
		{ name: 'Follow', description: 'Endpoints related to Follow' },
		{ name: 'Post', description: 'Endpoints related to Post' },
		{ name: 'Post Image', description: 'Endpoints related to Post Image' },
		{ name: 'Comment', description: 'Endpoints related to Comment' },
		{ name: 'Like', description: 'Endpoints related to Like' },
	],
	paths: {
		...authPath,
		...userPath,
		...profilePath,
		...profileImagePath,
		...followPath,
		...postPath,
		...postImagePath,
		...commentPath,
		...likePath,
	},
}

const outputPath = path.resolve(__dirname, '../public/swagger.json')
fs.writeFileSync(outputPath, JSON.stringify(swaggerDocument, null, 2))
console.log(`Swagger JSON generated at ${outputPath}`)
