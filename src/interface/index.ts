import type { UserRole } from '../prisma/client'

export type ErrorCode =
	| 'BAD_REQUEST'
	| 'UNAUTHORIZED'
	| 'FORBIDDEN'
	| 'NOT_FOUND'
	| 'TOO_MANY_REQUESTS'
	| 'INTERNAL_SERVER_ERROR'

interface ErrorCodeDetail {
	code: ErrorCode
	message: string
	httpStatus: number
}

export type ERROR_CODE_TYPE = Record<string, ErrorCodeDetail>

export const ERROR_CODE: ERROR_CODE_TYPE = {
	BAD_REQUEST: {
		code: 'BAD_REQUEST',
		message: 'Bad Request',
		httpStatus: 400,
	},
	UNAUTHORIZED: {
		code: 'UNAUTHORIZED',
		message: 'Unauthorized',
		httpStatus: 401,
	},
	FORBIDDEN: {
		code: 'FORBIDDEN',
		message: 'Forbidden',
		httpStatus: 403,
	},
	NOT_FOUND: {
		code: 'NOT_FOUND',
		message: 'Not Found',
		httpStatus: 404,
	},
	TOO_MANY_REQUESTS: {
		code: 'TOO_MANY_REQUESTS',
		message: 'Too Many Requests',
		httpStatus: 429,
	},
	INTERNAL_SERVER_ERROR: {
		code: 'INTERNAL_SERVER_ERROR',
		message: 'Internal Server Error',
		httpStatus: 500,
	},
}

export type ApiStatus = 'success' | 'error'

export interface ApiResponse<T> {
	status: ApiStatus
	data?: T
	error?: {
		code: ErrorCode
		message: string
	}
}

export interface Meta {
	currentPage: number
	totalPages: number
	perPage: number
	totalEntries: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	meta?: Meta
}

export interface QueryParams {
	search?: string
	page?: string
	perPage?: string
}

export interface AuthPayload {
	userId: string
	role: UserRole
}

export interface RequestWithAuthPayload extends Request {
	tokenPayload: AuthPayload
}

export interface RequestFilePayload extends Request {
	fileUrl: string
}

export const RefreshTokenName = 'refreshToken'

export const DIRECTORY_NAME = {
	BASE: 'uploads',
	PROFILE: 'profile',
	POST: 'post',
}
