import fs from 'fs/promises'

import { ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGE } from '../../utils'
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

const PORT = process.env.PORT ?? 3000
const HOST = process.env.HOST ?? 'http://localhost'

export const createProfileImage = async (
	profileId: string,
	file: Express.Multer.File,
	fileUrl: string,
) => {
	const { filename, size, path } = file
	const profileImage: ICreateProfileImage = {
		filename,
		size,
		path,
		file_url: `${HOST}:${PORT}/profiles/files/${fileUrl}`,
		profile_id: profileId,
	}
	const profile = await profileRepository.getProfile(profileId)
	if (!profile) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.PROFILE,
		)
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
	fileUrl: string,
) => {
	const { filename, size, path } = file
	const updateProfileImage: IUpdateProfileImage = {
		filename,
		size,
		path,
		file_url: `${HOST}:${PORT}/profiles/files/${fileUrl}`,
	}
	const profileImage =
		await profileImageRepository.getProfileImage(profileImageId)
	if (!profileImage) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.PROFILE_IMAGE,
		)
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
	await deleteFile(profileImage.path)
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
	const profileImageDeleted =
		await profileImageRepository.deleteProfileImage(profileImageId)
	if (!profileImageDeleted) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.DELETED.PROFILE_IMAGE,
		)
	}
	await deleteFile(profileImage.path)
	return deleteProfileImageDTOMapper(profileImageDeleted)
}

const deleteFile = async (path: string) => {
	try {
		await fs.unlink(path)
		console.log(`File ${path} deleted.`)
	} catch (err: any) {
		return new AppError(ERROR_CODE.INTERNAL_SERVER_ERROR.code, err.message)
	}
}
