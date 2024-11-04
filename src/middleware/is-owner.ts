import type { Request, Response, NextFunction } from 'express'

import * as productFileRepository from '../app/product-file/product-file.repository'
import * as productRepository from '../app/product/product.repository'
import { type RequestWithAuthPayload } from '../interface'
import { MESSAGE, ResponseHandler } from '../utils'

export const isOwner = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { productId, productFileId } = req.params
	const { tokenPayload } = req as unknown as RequestWithAuthPayload
	if (productId) {
		const product = await productRepository.getProduct(productId)
		if (!product) {
			ResponseHandler.notFound(next, MESSAGE.ERROR.NOT_FOUND.PRODUCT)
			return
		}
		const verify = product.user_id === tokenPayload.userId
		if (!verify) {
			ResponseHandler.forbidden(next, MESSAGE.ERROR.FORBIDDEN)
			return
		}
	}
	if (productFileId) {
		const productFile =
			await productFileRepository.getProductFile(productFileId)
		if (!productFile) {
			ResponseHandler.notFound(next, MESSAGE.ERROR.NOT_FOUND.FILE)
			return
		}
		const product = await productRepository.getProduct(productFile.product_id)
		if (!product) {
			ResponseHandler.notFound(next, MESSAGE.ERROR.NOT_FOUND.PRODUCT)
			return
		}
		const verify = product.user_id === tokenPayload.userId
		if (!verify) {
			ResponseHandler.forbidden(next, MESSAGE.ERROR.FORBIDDEN)
			return
		}
	}
	next()
}
