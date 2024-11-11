import { type OpenAPIV3 } from 'openapi-types'

import { authPath, userPath, profilePath, profileImagePath } from './path'

const PORT = process.env.PORT ?? 3000
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
			url: `${HOST}:${PORT}`,
			description: 'Internal server for development',
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
		// { name: 'Follow', description: 'Endpoints related to Follow' },
	],
	paths: {
		...authPath,
		...userPath,
		...profilePath,
		...profileImagePath,
		// ...followPath,
	},
}
