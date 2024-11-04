import { type User } from '../../prisma/client'
import { productsDTOMapper } from '../product/product.mapper'

import type { IUserProduct, IUserDTO } from './user.interface'

export const usersDTOMapper = (users: User[]): IUserDTO[] => {
	return users.map((user) => {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		}
	})
}

export const userWithProductDTOMapper = (user: IUserProduct): IUserDTO => {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		product: productsDTOMapper(user.product),
		productCount: user.product.length,
	}
}

export const userDTOMapper = (user: User): IUserDTO => {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	}
}
