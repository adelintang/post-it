import { ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'
import {
	MESSAGE,
	uploadImageCloudinary,
	updateImageCloudinary,
	deleteImageCloudinary,
} from '../../utils'
import * as profileRepository from '../profile/profile.repository'

import type {
	ICreateProfileImage,
	IUpdateProfileImage,
} from './profile-image.interface'
import {
	deleteProfileImageDTOMapper,
	profileImageDTOMapper,
} from './profile-image.mapper'
import * as profileImageRepository from './profile-image.repository'

export const createProfileImage = async (
	profileId: string,
	file: Express.Multer.File,
) => {
	const profile = await profileRepository.getProfile(profileId)
	if (!profile) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.PROFILE,
		)
	}
	const upload = await uploadImageCloudinary(file.path, 'profile')
	if (!upload) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.PROFILE_IMAGE,
		)
	}
	const profileImage: ICreateProfileImage = {
		public_id: upload.public_id,
		filename: `${upload.public_id}.${upload.format}`,
		size: upload.bytes,
		file_url: upload.secure_url,
		profile_id: profileId,
	}
	const createProfileImage =
		await profileImageRepository.createProfileImage(profileImage)
	if (!createProfileImage) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.PROFILE_IMAGE,
		)
	}
	return profileImageDTOMapper(createProfileImage)
}

export const updateProfileImage = async (
	profileImageId: string,
	file: Express.Multer.File,
) => {
	const profileImage =
		await profileImageRepository.getProfileImage(profileImageId)
	if (!profileImage) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.PROFILE_IMAGE,
		)
	}
	const upload = await updateImageCloudinary(file.path, profileImage.public_id)
	if (!upload) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.UPDATED.PROFILE_IMAGE,
		)
	}
	const updateProfileImage: IUpdateProfileImage = {
		filename: `${upload.public_id}.${upload.format}`,
		size: upload.bytes,
		file_url: upload.secure_url,
	}
	const profileImageUpdated = await profileImageRepository.updateProfileImage(
		profileImageId,
		updateProfileImage,
	)
	if (!profileImageUpdated) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.UPDATED.PROFILE_IMAGE,
		)
	}
	return profileImageDTOMapper(profileImageUpdated)
}

export const deleteProfileImage = async (profileImageId: string) => {
	const profileImage =
		await profileImageRepository.getProfileImage(profileImageId)
	if (!profileImage) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.PROFILE_IMAGE,
		)
	}
	const deleteFile = await deleteImageCloudinary(profileImage.public_id)
	if (!deleteFile) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.PROFILE_IMAGE,
		)
	}
	const profileImageDeleted =
		await profileImageRepository.deleteProfileImage(profileImageId)
	if (!profileImageDeleted) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.PROFILE_IMAGE,
		)
	}
	return deleteProfileImageDTOMapper(profileImageDeleted)
}
