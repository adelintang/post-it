import { type Request, type Response, type NextFunction } from 'express'

import { type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGE, ResponseHandler } from '../../utils'

import * as productService from './product.service'

export const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const product = await productService.createProduct(body)
	if (product instanceof AppError) {
		next(product)
		return
	}
	ResponseHandler.created(res, product, MESSAGE.SUCCESS.CREATED.PRODUCT)
}

export const getProducts = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const products = await productService.getProducts(query)
	if (products instanceof AppError) {
		next(products)
		return
	}
	ResponseHandler.ok(
		res,
		products?.data,
		MESSAGE.SUCCESS.GET.PRODUCTS,
		products?.meta,
	)
}

export const getProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { productId } = req.params
	const product = await productService.getProduct(productId)
	if (product instanceof AppError) {
		next(product)
		return
	}
	ResponseHandler.ok(res, product, MESSAGE.SUCCESS.GET.PRODUCT)
}

export const updateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { productId } = req.params
	const { body } = req
	const product = await productService.updateProduct(productId, body)
	if (product instanceof AppError) {
		next(product)
		return
	}
	ResponseHandler.ok(res, product, MESSAGE.SUCCESS.UPDATED.PRODUCT)
}
export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { productId } = req.params
	const product = await productService.deleteProduct(productId)
	if (product instanceof AppError) {
		next(product)
		return
	}
	ResponseHandler.ok(res, product, MESSAGE.SUCCESS.DELETED.PRODUCT)
}
