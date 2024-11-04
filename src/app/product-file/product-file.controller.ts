import path from 'path'

import type { Request, Response, NextFunction } from 'express'

import { ERROR_CODE, type RequestFilePayload } from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGE, ResponseHandler } from '../../utils'

import * as productFileService from './product-file.service'

export const uploadProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { file } = req
	const { fileUrl } = req as unknown as RequestFilePayload
	const { productId } = req.params
	if (!file) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.FILE.NOT_PROVIDED,
		)
		next(error)
		return
	}
	const data = await productFileService.createProductFile(
		productId,
		file,
		fileUrl,
	)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.created(res, data, MESSAGE.SUCCESS.CREATED.FILE)
}

export const getFileProduct = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { filename } = req.params
	const filePath = path.join(
		__dirname,
		'..',
		'..',
		'..',
		'uploads',
		'product',
		filename,
	)
	res.sendFile(filePath)
}

export const updateProductFile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { file } = req
	const { fileUrl } = req as unknown as RequestFilePayload
	const { productFileId } = req.params
	if (!file) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGE.ERROR.FILE.NOT_PROVIDED,
		)
		next(error)
		return
	}
	const data = await productFileService.updateProductFile(
		productFileId,
		file,
		fileUrl,
	)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(res, data, MESSAGE.SUCCESS.UPDATED.FILE)
}

export const deleteProductFile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { productFileId } = req.params
	const data = await productFileService.deleteProductFile(productFileId)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(res, data, MESSAGE.SUCCESS.DELETED.FILE)
}
