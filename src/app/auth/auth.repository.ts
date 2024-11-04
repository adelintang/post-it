import { db, generateUUID } from '../../utils'

import { type IRegister } from './auth.interface'

export const register = async (user: IRegister) => {
	return db.user.create({
		data: {
			id: `user-${generateUUID()}`,
			username: user.username,
			email: user.email,
			password: user.password,
			role: user.role,
		},
	})
}

export const getUserByEmail = async (email: string) => {
	return db.user.findUnique({
		where: {
			email,
		},
	})
}
