import type { Profile, ProfileImage, User } from '../../prisma/client'

interface IProfileInUser extends Profile {
	profileImage: ProfileImage
}

export interface ISearchUser extends User {
	profile: IProfileInUser
}

export interface ISearchUserDTO {
	id: string
	username: string
	profile: {
		id: string
		fullname: string
		profile_image: {
			id: string
			file_url: string
		}
	}
}
