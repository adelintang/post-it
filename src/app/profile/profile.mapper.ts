import type { User, Profile, ProfileImage } from '../../prisma/client'

import type {
	IProfileWithUser,
	ICreateOrUpdateProfileDTO,
	IProfileDTO,
	IUserInProfileDTO,
	IProfileImageInProfileDTO,
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

const profileImageInProfileDTOMapper = (
	profileImage: ProfileImage,
): IProfileImageInProfileDTO => {
	return {
		id: profileImage.id,
		file_url: profileImage.file_url,
	}
}

export const profileDTOMapper = (profile: IProfileWithUser): IProfileDTO => {
	return {
		id: profile.id,
		fullname: profile.fullname,
		bio: profile.bio,
		user: userInProfileDTOMapper(profile.user),
		profile_image: profileImageInProfileDTOMapper(profile.profileImage),
	}
}
