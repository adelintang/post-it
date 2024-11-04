import fs from 'fs/promises'

import { ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'
import { type ProductFiles } from '../../prisma/client'
import { MESSAGE } from '../../utils'
import * as productRepository from '../product/product.repository'

import {
	deletedProductFileDTOMapper,
	productFileDTOMapper,
} from './product-file.mapper'
import * as productFileRepository from './product-file.repository'

const PORT = process.env.PORT ?? 3000
const HOST = process.env.HOST ?? 'http://localhost'

export const createProductFile = async (
	productId: string,
	file: Express.Multer.File,
	fileUrl: string,
) => {
	const { filename, size, path } = file
	const productFile = {
		filename,
		size,
		path,
		file_url: `${HOST}:${PORT}/products/files/${fileUrl}`,
		product_id: productId,
	}
	const product = await productRepository.getProduct(productId)
	if (!product) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.PRODUCT,
		)
	}
	const createProductFile = await productFileRepository.createProductFile(
		productFile as ProductFiles,
	)
	if (!createProductFile) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.FILE,
		)
	}
	return productFileDTOMapper(createProductFile)
}

export const updateProductFile = async (
	productFileId: string,
	file: Express.Multer.File,
	fileUrl: string,
) => {
	const { filename, size, path } = file
	const updateProductFile = {
		filename,
		size,
		path,
		file_url: `${HOST}:${PORT}/products/files/${fileUrl}`,
	}
	const productFile = await productFileRepository.getProductFile(productFileId)
	if (!productFile) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.FILE)
	}
	const updatedProductFile = await productFileRepository.updateProductFile(
		productFileId,
		updateProductFile as ProductFiles,
	)
	if (!updatedProductFile) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.UPDATED.FILE,
		)
	}
	await deleteFile(productFile.path)
	return productFileDTOMapper(updatedProductFile)
}

export const deleteProductFile = async (productFileId: string) => {
	const productFile = await productFileRepository.getProductFile(productFileId)
	if (!productFile) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.FILE)
	}
	const deletedProductFile =
		await productFileRepository.deleteProductFile(productFileId)
	if (!deletedProductFile) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.FILE,
		)
	}
	await deleteFile(productFile.path)
	return deletedProductFileDTOMapper(deletedProductFile)
}

const deleteFile = async (path: string) => {
	try {
		await fs.unlink(path)
		console.log(`File ${path} deleted.`)
	} catch (err: any) {
		return new AppError(ERROR_CODE.INTERNAL_SERVER_ERROR.code, err.message)
	}
}
