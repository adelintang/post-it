import { type User } from '../../prisma/client'

import { type IRegisterDTO } from './auth.interface'

export const registerDTOMapper = (user: User): IRegisterDTO => {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	}
}
