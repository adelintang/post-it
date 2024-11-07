import type { ISearchUser, ISearchUserDTO } from './user.interface'

export const searchUsersDTOMapper = (
	users: ISearchUser[],
): ISearchUserDTO[] => {
	return users.map((user) => searchUserDTOMapper(user))
}

export const searchUserDTOMapper = (user: ISearchUser): ISearchUserDTO => {
	return {
		id: user.id,
		username: user.username,
		profile: {
			id: user.profile.id,
			fullname: user.profile.fullname,
			profile_image: {
				id: user.profile.profileImage.id,
				file_url: user.profile.profileImage.file_url,
			},
		},
	}
}
