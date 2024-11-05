import type { User, Profile } from '../../prisma/client'

import type {
	IProfileWithUser,
	ICreateOrUpdateProfileDTO,
	IProfilesDTO,
	IProfileDTO,
	IUserInProfileDTO,
} from './profile.interface'

export const createOrUpdateProfileDTOMapper = (
	profile: Profile,
): ICreateOrUpdateProfileDTO => {
	return {
		id: profile.id,
		bio: profile.bio,
		fullname: profile.fullname,
		user_id: profile.user_id,
	}
}

const userInProfileDTOMapper = (user: User): IUserInProfileDTO => {
	return {
		id: user.id,
		username: user.username,
	}
}

export const profilesDTOMapper = (
	profiles: IProfileWithUser[],
): IProfilesDTO[] => {
	return profiles.map((profile) => {
		return {
			id: profile.id,
			fullname: profile.fullname,
			user: userInProfileDTOMapper(profile.user),
		}
	})
}

export const profileDTOMapper = (profile: IProfileWithUser): IProfileDTO => {
	return {
		id: profile.id,
		fullname: profile.fullname,
		bio: profile.bio,
		user: userInProfileDTOMapper(profile.user),
	}
}
