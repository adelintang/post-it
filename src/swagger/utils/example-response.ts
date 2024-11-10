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

const UserData = {
	id: 'user-c8164c32-9f66-4982-aeb9-7c0fdbc2add7',
	username: 'johanes',
	profile: {
		id: 'profile-c24e7a1d-997b-4d5a-a539-026d56761903',
		fullname: 'Johanes Alexandra',
		profile_image: {
			id: 'profile-image-798d02f7-4d9d-4374-83ca-f054d8fc1773',
			file_url:
				'http://localhost:3000/profiles/files/file-1730907730863-7415028.jpg',
		},
	},
}

const ProductData = {
	id: 'aba89b70-52dd-41df-bdd8-8e5f4226dcb4',
	name: 'PlayStation 5 Digital Edition',
	desc: 'Konsol game next-gen dari Sony tanpa drive Blu-ray.',
	price: 8500000,
	stock: 20,
}

const ProductDataWithMutation = {
	...ProductData,
	user_id: 'user-27e53b8d-dc3c-46a3-ae3b-52a167e3701e',
	created_at: '2024-11-02T17:14:12.221Z',
	updated_at: '2024-11-02T17:14:12.221Z',
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
	PRODUCTS_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.PRODUCTS,
		data: [
			{
				...ProductData,
				product_file: null,
			},
		],
		meta: Meta,
	},
	PRODUCT_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.PRODUCT,
		data: {
			...ProductData,
			user: UserData,
			product_file: null,
		},
	},
	PRODUCT_CREATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.PRODUCT,
		data: ProductDataWithMutation,
	},
	PRODUCT_UPDATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.UPDATED.PRODUCT,
		data: ProductDataWithMutation,
	},
	PRODUCT_DELETED: {
		status: 'success',
		message: MESSAGE.SUCCESS.DELETED.PRODUCT,
		data: ProductDataWithMutation,
	},
	PRODUCT_FILE_CREATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.FILE,
		data: ProductFile,
	},
	PRODUCT_FILE_UPDATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.UPDATED.FILE,
		data: ProductFile,
	},
	PRODUCT_FILE_DELETED: {
		status: 'success',
		message: MESSAGE.SUCCESS.DELETED.FILE,
		data: {
			id: ProductFile.id,
			product_id: ProductFile.product_id,
		},
	},
}
