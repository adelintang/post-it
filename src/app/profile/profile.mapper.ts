import type { Profile } from '../../prisma/client'
import { profileImageInProfileDTOMapper } from '../profile-image/profile-image.mapper'
import { userInProfileDTOMapper } from '../user/user.mapper'

import type {
	IProfileWithUser,
	ICreateOrUpdateProfileDTO,
	IProfileDTO,
	IProfileWithProfileImageDTO,
	IProfileWithProfileImage,
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

export const profileDTOMapper = (profile: IProfileWithUser): IProfileDTO => {
	return {
		id: profile.id,
		fullname: profile.fullname,
		bio: profile.bio,
		user: userInProfileDTOMapper(profile.user),
		profile_image: profile.profileImage
			? profileImageInProfileDTOMapper(profile.profileImage)
			: null,
	}
}

export const profileWithProfileImageDTOMapper = (
	profile: IProfileWithProfileImage,
): IProfileWithProfileImageDTO => {
	return {
		id: profile.id,
		fullname: profile.fullname,
		profile_image: profile.profileImage
			? profileImageInProfileDTOMapper(profile.profileImage)
			: null,
	}
}
