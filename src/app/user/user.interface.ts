import type { Profile, ProfileImage, User } from '../../prisma/client'
import type { IProfileWithProfileImageDTO } from '../profile/profile.interface'

export interface IProfileInUser extends Profile {
	profileImage: ProfileImage
}

export interface ISearchUser extends User {
	profile: IProfileInUser
}

export interface ISearchUserDTO {
	id: string
	username: string
	profile: IProfileWithProfileImageDTO
}

export interface IUserInProfileDTO {
	id: string
	username: string
}
