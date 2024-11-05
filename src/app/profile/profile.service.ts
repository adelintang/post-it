import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { type Profile } from '../../prisma/client'
import { MESSAGE, metaPagination } from '../../utils'
import * as userRepository from '../user/user.repository'

import { type IProfileWithUser } from './profile.interface'
import {
	createOrUpdateProfileDTOMapper,
	profileDTOMapper,
	profilesDTOMapper,
} from './profile.mapper'
import * as profileRepository from './profile.repository'

export const createProfile = async (data: Profile) => {
	const user = await userRepository.getUser(data.user_id)
	if (!user) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.USER)
	}
	const profile = await profileRepository.createProfile(data)
	if (!profile) {
		return new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.CREATED.PROFILE,
		)
	}
	return createOrUpdateProfileDTOMapper(profile)
}

export const getProfiles = async (query: QueryParams) => {
	const { page = '1', perPage = '10' } = query
	const [profiles, totalData] = await Promise.all([
		profileRepository.getProfilesByUsername(query),
		profileRepository.getCountProfilesByUsername(query),
	])
	const meta = metaPagination(
		Number(page),
		Number(perPage),
		profiles.length,
		totalData,
	)
	return { data: profilesDTOMapper(profiles), meta }
}

export const getProfile = async (profileId: string) => {
	const profile = await profileRepository.getProfile(profileId)
	if (!profile) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.PROFILE,
		)
	}
	return profileDTOMapper(profile as IProfileWithUser)
}

export const updateProfile = async (profileId: string, data: Profile) => {
	const profile = await profileRepository.getProfile(profileId)
	if (!profile) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.NOT_FOUND.PROFILE,
		)
	}
	const profileUpdated = await profileRepository.updateProfile(profileId, data)
	if (!profileUpdated) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			MESSAGE.ERROR.INTERNAL_SERVER_ERROR.UPDATED.PROFILE,
		)
	}
	return createOrUpdateProfileDTOMapper(profileUpdated)
}
