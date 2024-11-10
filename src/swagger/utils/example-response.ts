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

const ProductFile = {
	id: 'file-7494a417-87d8-4935-a981-fb626849249a',
	file_url:
		'http://localhost:3000/products/files/file-1730482012446-578818135.jpg',
	filename: 'file-1730482012446-578818135.jpg',
	size: 3901,
	product_id: 'product-24841147-6d24-46c5-8c73-875c7c6129ae',
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
}
