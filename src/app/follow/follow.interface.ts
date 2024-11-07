import type { User, Profile, Follow, ProfileImage } from '../../prisma/client'

interface IProfileInUser extends Profile {
	profileImage: ProfileImage
}

interface IUserInFollow extends User {
	profile: IProfileInUser
}

export interface IFollow extends Follow {
	follower: IUserInFollow
	following: IUserInFollow
}

export interface IFollowerDTO {
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

export interface IFollowingDTO extends IFollowerDTO {}
