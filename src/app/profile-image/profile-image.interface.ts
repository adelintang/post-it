export interface IUpdateProfileImage {
	file_url: string
	filename: string
	path: string
	size: number
}

export interface ICreateProfileImage extends IUpdateProfileImage {
	profile_id: string
}

export interface IProfileImageDTO {
	id: string
	file_url: string
	filename: string
	size: number
	profile_id: string
}

export interface IDeleteProfileImageDTO {
	id: string
	profile_id: string
}

export interface IProfileImageInProfileDTO {
	id: string
	file_url: string
}
