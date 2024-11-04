import { Router } from 'express'

import { hasRole, validateRequest, isOwner } from '../../middleware'
import { UserRole } from '../../prisma/client'
import { upload, catchAsync } from '../../utils'
import {
	uploadProduct,
	getFileProduct,
	updateProductFile,
	deleteProductFile,
} from '../product-file/product-file.controller'

import {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
} from './product.controller'
import { createProductSchema, updateProductSchema } from './product.request'

const route = Router()

route.post(
	'/files/:productId/upload',
	hasRole(UserRole.SELLER),
	isOwner,
	upload.single('file'),
	catchAsync(uploadProduct),
)
route.patch(
	'/files/:productFileId/upload',
	hasRole(UserRole.SELLER),
	isOwner,
	upload.single('file'),
	catchAsync(updateProductFile),
)
route.delete(
	'/files/:productFileId',
	hasRole(UserRole.SELLER),
	isOwner,
	catchAsync(deleteProductFile),
)
route.get('/files/:filename', catchAsync(getFileProduct))
route.post(
	'/',
	hasRole(UserRole.SELLER),
	validateRequest(createProductSchema),
	catchAsync(createProduct),
)
route.get('/:productId', catchAsync(getProduct))
route.get('/', catchAsync(getProducts))
route.patch(
	'/:productId',
	hasRole(UserRole.SELLER),
	isOwner,
	validateRequest(updateProductSchema),
	catchAsync(updateProduct),
)
route.delete(
	'/:productId',
	hasRole(UserRole.SELLER),
	isOwner,
	catchAsync(deleteProduct),
)

export default route
