import type { Profile, User } from '../../prisma/client'

export interface IProfileWithUser extends Profile {
	user: User
}

export interface ICreateOrUpdateProfileDTO {
	id: string
	fullname: string
	bio: string
	user_id: string
}

export interface IUserInProfileDTO {
	id: string
	username: string
}

export interface IProfilesDTO {
	id: string
	fullname: string
	user: IUserInProfileDTO
}

export interface IProfileDTO extends IProfilesDTO {
	bio: string
}
