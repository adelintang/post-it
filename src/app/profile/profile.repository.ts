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

export const getProfile = async (profileId: string) => {
	return db.profile.findUnique({
		where: {
			id: profileId,
		},
		include: {
			user: true,
			profileImage: true,
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
