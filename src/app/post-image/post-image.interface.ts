import type { IUpdateProfileImage } from '../profile-image/profile-image.interface'

export interface IUpdatePostImage extends IUpdateProfileImage {}
export interface ICreatePostImage extends IUpdateProfileImage {
	post_id: string
}

export interface IPostImageDTO {
	id: string
	file_url: string
	filename: string
	size: number
	post_id: string
}

export interface IDeletePostImageDTO {
	id: string
	post_id: string
}
