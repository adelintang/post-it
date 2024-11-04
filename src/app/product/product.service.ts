import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { type Product } from '../../prisma/client'
import { MESSAGE, metaPagination } from '../../utils'
import * as userRepository from '../user/user.repository'

import type { IProductsWithFile, IProductUser } from './product.interface'
import { productDTOMapper, productsDTOMapper } from './product.mapper'
import * as productRepository from './product.repository'

export const createProduct = async (data: Product) => {
	const user = await userRepository.getUser(data.user_id)
	if (!user) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.USER)
	}
	const product = await productRepository.createProduct(data)
	if (!product) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.PRODUCT,
		)
	}
	return product
}

export const getProducts = async (query: QueryParams) => {
	const { page = '1', perPage = '10' } = query
	const [products, totalData] = await Promise.all([
		productRepository.getProducts(query),
		productRepository.getProductsCount(query),
	])
	const meta = metaPagination(
		Number(page),
		Number(perPage),
		products.length,
		totalData,
	)
	return { data: productsDTOMapper(products as IProductsWithFile[]), meta }
}

export const getProduct = async (productId: string) => {
	const product = await productRepository.getProduct(productId)
	if (!product) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.PRODUCT,
		)
	}
	return productDTOMapper(product as IProductUser)
}

export const updateProduct = async (productId: string, data: Product) => {
	const product = await productRepository.getProduct(productId)
	if (!product) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.PRODUCT,
		)
	}
	const updatedProduct = await productRepository.updateProduct(productId, data)
	if (!updatedProduct) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.UPDATED.PRODUCT,
		)
	}
	return updatedProduct
}

export const deleteProduct = async (productId: string) => {
	const product = await productRepository.getProduct(productId)
	if (!product) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.PRODUCT,
		)
	}
	const deletedProduct = await productRepository.deleteProduct(productId)
	if (!deletedProduct) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.PRODUCT,
		)
	}
	return deletedProduct
}
