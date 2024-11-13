import { db, generateUUID } from '../../utils'

import type {
	ICreateProfileImage,
	IUpdateProfileImage,
} from './profile-image.interface'

export const createProfileImage = async (profileImage: ICreateProfileImage) => {
	return db.profileImage.create({
		data: {
			id: `profile-image-${generateUUID()}`,
			public_id: profileImage.public_id,
			file_url: profileImage.file_url,
			filename: profileImage.filename,
			size: profileImage.size,
			profile_id: profileImage.profile_id,
		},
	})
}

export const getProfileImage = async (profileImageId: string) => {
	return db.profileImage.findUnique({
		where: {
			id: profileImageId,
		},
	})
}

export const updateProfileImage = async (
	profileImageId: string,
	profileImage: IUpdateProfileImage,
) => {
	return db.profileImage.update({
		where: {
			id: profileImageId,
		},
		data: {
			...profileImage,
		},
	})
}

export const deleteProfileImage = async (profileImageId: string) => {
	return db.profileImage.delete({
		where: {
			id: profileImageId,
		},
	})
}
