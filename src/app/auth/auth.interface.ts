import { type UserRole } from '../../prisma/client'

export interface IRegister {
	name: string
	email: string
	password: string
	role: UserRole
}

export interface ILogin {
	email: string
	password: string
}

export interface IRegisterDTO {
	id: string
	name: string
	email: string
	role: UserRole
}
