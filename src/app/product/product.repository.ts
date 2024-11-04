import { type QueryParams } from '../../interface'
import { type Product } from '../../prisma/client'
import { db, generateUUID } from '../../utils'

export const createProduct = async (product: Product) => {
	return db.product.create({
		data: {
			id: `product-${generateUUID()}`,
			name: product.name,
			desc: product.desc,
			price: product.price,
			stock: product.stock,
			user_id: product.user_id,
		},
	})
}

export const getProducts = async (query: QueryParams) => {
	const { search = '', page = '1', perPage = '10' } = query
	return db.product.findMany({
		where: {
			name: {
				contains: search.trim(),
				mode: 'insensitive',
			},
		},
		include: {
			product_file: true,
		},
		skip: (Number(page) - 1) * Number(perPage),
		take: Number(perPage),
	})
}

export const getProductsCount = async (query: QueryParams) => {
	const { search = '' } = query
	return db.product.count({
		where: {
			name: {
				contains: search.trim(),
				mode: 'insensitive',
			},
		},
	})
}

export const getProduct = async (productId: string) => {
	return db.product.findUnique({
		where: {
			id: productId,
		},
		include: {
			user: true,
			product_file: true,
		},
	})
}

export const updateProduct = async (productId: string, product: Product) => {
	return db.product.update({
		where: {
			id: productId,
		},
		data: {
			...product,
		},
	})
}

export const deleteProduct = async (productId: string) => {
	return db.product.delete({
		where: {
			id: productId,
		},
	})
}
