import type { ProductFiles } from '../../prisma/client'

import type {
	IDeleteProductFileDTO,
	IProductFileDTO,
	IProductsFileDTO,
} from './product-file.interface'

export const productFileDTOMapper = (
	productFile: ProductFiles,
): IProductFileDTO => {
	return {
		id: productFile.id,
		file_url: productFile.file_url,
		filename: productFile.filename,
		size: productFile.size,
		product_id: productFile.product_id,
	}
}

export const deletedProductFileDTOMapper = (
	productFile: ProductFiles,
): IDeleteProductFileDTO => {
	return {
		id: productFile.id,
		product_id: productFile.product_id,
	}
}

export const productsFileDTOMapper = (
	productFile: ProductFiles,
): IProductsFileDTO => {
	return {
		id: productFile.id,
		file_url: productFile.file_url,
	}
}
