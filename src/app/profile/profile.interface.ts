import type { Profile, User, ProfileImage } from '../../prisma/client'
import type { IProfileImageInProfileDTO } from '../profile-image/profile-image.interface'
import type { IProfileInUser, IUserInProfileDTO } from '../user/user.interface'

export interface IProfileWithUser extends Profile {
	user: User
	profileImage: ProfileImage
}

export interface IProfileWithProfileImage extends IProfileInUser {}

export interface ICreateOrUpdateProfileDTO {
	id: string
	fullname: string
	bio: string
	user_id: string
}

export interface IProfileDTO {
	id: string
	fullname: string
	bio: string
	user: IUserInProfileDTO
	profile_image: IProfileImageInProfileDTO
}

export interface IProfileWithProfileImageDTO {
	id: string
	fullname: string
	profile_image: IProfileImageInProfileDTO | null
}
