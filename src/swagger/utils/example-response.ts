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

const UserData = {
	id: 'user-4897a10-4920-ba1c-c25cfec7fcc2',
	name: 'john doe',
	email: 'johndoe@gmail.com',
	role: 'SELLER',
}

export const fakeToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6.eyJ1c2VySWQiOiJ1c2VyLTI3ZTUzYjhkLWRjM2MtNDZhMy1hZTNiLTUyYTE2N2UzNzAxZSI.Q-qzrjZ-OurXdrgLBVOnMwbJi1ookcnp'

export const EXAMPLE_RESPONSE: Record<string, IExampleResponse> = {
	REGISTER: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.USER,
		data: UserData,
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
		data: [
			{
				...UserData,
			},
		],
		meta: Meta,
	},
	USER_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.USER,
		data: {
			...UserData,
			product: [],
			productCount: 0,
		},
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
