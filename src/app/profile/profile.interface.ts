import type { Profile, User, ProfileImage } from '../../prisma/client'

export interface IProfileWithUser extends Profile {
	user: User
	profileImage: ProfileImage
}

export interface ICreateOrUpdateProfileDTO {
	id: string
	fullname: string
	bio: string
	user_id: string
}

export interface IUserInProfileDTO {
	id: string
	username: string
}

interface IProfilesDTO {
	id: string
	fullname: string
	user: IUserInProfileDTO
	profile_image: IProfileImageInProfileDTO
}

export interface IProfileDTO extends IProfilesDTO {
	bio: string
}

export interface IProfileImageInProfileDTO {
	id: string
	file_url: string
}
