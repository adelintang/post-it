import { type QueryParams } from '../../interface'
import { type Profile } from '../../prisma/client'
import { db, generateUUID } from '../../utils'

export const createProfile = async (profile: Profile) => {
	return db.profile.create({
		data: {
			id: `profile-${generateUUID()}`,
			fullname: profile.fullname,
			bio: profile.bio,
			user_id: profile.user_id,
		},
	})
}

export const getProfilesByUsername = async (query: QueryParams) => {
	const { search = '', page = '1', perPage = '10' } = query
	return db.profile.findMany({
		where: {
			user: {
				username: {
					contains: search.trim(),
					mode: 'insensitive',
				},
			},
		},
		include: {
			user: true,
		},
		skip: (Number(page) - 1) * Number(perPage),
		take: Number(perPage),
	})
}

export const getCountProfilesByUsername = async (query: QueryParams) => {
	const { search = '' } = query
	return db.profile.count({
		where: {
			user: {
				username: {
					contains: search.trim(),
					mode: 'insensitive',
				},
			},
		},
	})
}

export const getProfile = async (profileId: string) => {
	return db.profile.findUnique({
		where: {
			id: profileId,
		},
		include: {
			user: true,
		},
	})
}

export const updateProfile = async (profileId: string, profile: Profile) => {
	return db.profile.update({
		where: {
			id: profileId,
		},
		data: {
			...profile,
		},
	})
}
