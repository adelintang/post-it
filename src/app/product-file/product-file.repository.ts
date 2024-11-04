import type { ProductFiles } from '../../prisma/client'
import { db, generateUUID } from '../../utils'

export const createProductFile = async (productFile: ProductFiles) => {
	return db.productFiles.create({
		data: {
			id: `file-${generateUUID()}`,
			file_url: productFile.file_url,
			filename: productFile.filename,
			path: productFile.path,
			size: productFile.size,
			product_id: productFile.product_id,
		},
	})
}

export const getProductFile = async (productFileId: string) => {
	return db.productFiles.findUnique({
		where: {
			id: productFileId,
		},
	})
}

export const updateProductFile = async (
	productFileId: string,
	productFile: ProductFiles,
) => {
	return db.productFiles.update({
		where: {
			id: productFileId,
		},
		data: {
			filename: productFile.filename,
			path: productFile.path,
			size: productFile.size,
		},
	})
}

export const deleteProductFile = async (productFileId: string) => {
	return db.productFiles.delete({
		where: {
			id: productFileId,
		},
	})
}
