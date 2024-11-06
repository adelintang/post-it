import { type ProfileImage } from '../../prisma/client'

import type {
	IProfileImageDTO,
	IDeleteProfileImageDTO,
} from './profile-image.interface'

export const profileImageDTOMapper = (
	profileImage: ProfileImage,
): IProfileImageDTO => {
	return {
		id: profileImage.id,
		file_url: profileImage.file_url,
		filename: profileImage.filename,
		size: profileImage.size,
		profile_id: profileImage.profile_id,
	}
}

export const deleteProfileImageDTOMapper = (
	profileImage: ProfileImage,
): IDeleteProfileImageDTO => {
	return {
		id: profileImage.id,
		profile_id: profileImage.profile_id,
	}
}
