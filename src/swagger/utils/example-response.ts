import { MESSAGE } from '../../utils'

export interface IExampleResponse {
	status: 'success' | 'error'
	message: string
	data: any
	meta?: any
}

const Meta = {
	currentPage: 1,
	perPage: 10,
	totalCurrentPage: 1,
	totalPage: 1,
	totalData: 1,
}

const UserRegisterData = {
	id: 'user-59b3da99-1505-417c-a81a-6b684458dc6c',
	username: 'johndoe',
	email: 'johndoe@gmail.com',
	role: 'USER',
}

const ProfileImageGeneralData = {
	id: 'profile-image-798d02f7-4d9d-4374-83ca-f054d8fc1773',
	file_url:
		'http://localhost:3000/profiles/files/file-1730907730863-7415028.jpg',
}

const ProfileGeneralData = {
	id: 'profile-c24e7a1d-997b-4d5a-a539-026d56761903',
	fullname: 'Johanes Alexandra',
	profile_image: ProfileImageGeneralData,
}

const UserGeneralData = {
	id: 'user-c8164c32-9f66-4982-aeb9-7c0fdbc2add7',
	username: 'johanes',
}

const UserData = {
	id: 'user-c8164c32-9f66-4982-aeb9-7c0fdbc2add7',
	username: 'johanes',
	profile: ProfileGeneralData,
}

const ProfileData = {
	id: 'profile-c8164c32-9f66-4982-aeb9-7c0fdbc2add7',
	bio: "I'am Student",
	fullname: 'John Doe',
	user_id: 'user-59b3da99-1505-417c-a81a-6b684458dc6c',
}

const GetProfileData = {
	id: 'profile-c24e7a1d-997b-4d5a-a539-026d56761903',
	fullname: 'Johanes Alexandra',
	bio: "I'am Student and i'am exiceted learn web dev",
	user: UserGeneralData,
	profile_image: ProfileImageGeneralData,
}

const ProfileFileData = {
	id: 'profile-image-14874ca4-d7a7-4f71-a927-e1f2bc5fc55e',
	file_url:
		'http://localhost:3000/profiles/files/file-1731341046422-455151246.jpg',
	filename: 'file-1731341046422-455151246.jpg',
	size: 6572,
	profile_id: 'profile-5128f16a-68e5-4b40-b1b8-d28a691d84da',
}

export const fakeToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6.eyJ1c2VySWQiOiJ1c2VyLTI3ZTUzYjhkLWRjM2MtNDZhMy1hZTNiLTUyYTE2N2UzNzAxZSI.Q-qzrjZ-OurXdrgLBVOnMwbJi1ookcnp'

export const EXAMPLE_RESPONSE: Record<string, IExampleResponse> = {
	REGISTER: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.USER,
		data: UserRegisterData,
	},
	LOGIN: {
		status: 'success',
		message: MESSAGE.SUCCESS.LOGIN,
		data: {
			accessToken: fakeToken,
		},
	},
	REFRESH_TOKEN: {
		status: 'success',
		message: MESSAGE.SUCCESS.ACCESS_TOKEN,
		data: {
			accessToken: fakeToken,
		},
	},
	USERS_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.USERS,
		data: [UserData],
		meta: Meta,
	},
	PROFILE_CREATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.PROFILE,
		data: ProfileData,
	},
	PROFILE_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.PROFILE,
		data: GetProfileData,
	},
	PROFILE_UPDATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.UPDATED.PROFILE,
		data: ProfileData,
	},
	PROFILE_IMAGE_CREATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.PROFILE_IMAGE,
		data: ProfileFileData,
	},
	PROFILE_IMAGE_UPDATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.UPDATED.PROFILE_IMAGE,
		data: ProfileFileData,
	},
	PROFILE_IMAGE_DELETED: {
		status: 'success',
		message: MESSAGE.SUCCESS.DELETED.PROFILE_IMAGE,
		data: {
			id: ProfileFileData.id,
			profile_id: ProfileFileData.profile_id,
		},
	},
}
