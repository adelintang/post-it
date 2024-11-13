import { v4 as uuidv4 } from 'uuid'

export * from './response-handler'
export * from './messages'
export * from './meta-pagination'
export * from './joi-error-message'
export * from './db'
export * from './token'
export * from './upload-file'
export * from './handle-prisma-error'
export * from './catch-async'
export * from './rate-limit'
export * from './cloudinary'
export const generateUUID = () => {
	return uuidv4()
}
