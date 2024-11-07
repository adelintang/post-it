import type { User } from '../../prisma/client'
import { profileWithProfileImageDTOMapper } from '../profile/profile.mapper'

import type {
	ISearchUser,
	ISearchUserDTO,
	IUserInProfileDTO,
} from './user.interface'

export const searchUsersDTOMapper = (
	users: ISearchUser[],
): ISearchUserDTO[] => {
	return users.map((user) => searchUserDTOMapper(user))
}

export const searchUserDTOMapper = (user: ISearchUser): ISearchUserDTO => {
	return {
		id: user.id,
		username: user.username,
		profile: profileWithProfileImageDTOMapper(user.profile),
	}
}

export const userInProfileDTOMapper = (user: User): IUserInProfileDTO => {
	return {
		id: user.id,
		username: user.username,
	}
}
