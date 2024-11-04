import {
	productFileDTOMapper,
	productsFileDTOMapper,
} from '../product-file/product-file.mapper'
import { userDTOMapper } from '../user/user.mapper'

import type {
	IProductUser,
	IProductDTO,
	IProductsWithFile,
} from './product.interface'

export const productsDTOMapper = (
	products: IProductsWithFile[],
): IProductDTO[] => {
	return products.map((product) => {
		return {
			id: product.id,
			name: product.name,
			desc: product.desc,
			price: product.price,
			stock: product.stock,
			product_file: product.product_file
				? productsFileDTOMapper(product.product_file)
				: null,
		}
	})
}

export const productDTOMapper = (product: IProductUser): IProductDTO => {
	return {
		id: product.id,
		name: product.name,
		desc: product.desc,
		price: product.price,
		stock: product.stock,
		user: userDTOMapper(product.user),
		product_file: product.product_file
			? productFileDTOMapper(product.product_file)
			: null,
	}
}
