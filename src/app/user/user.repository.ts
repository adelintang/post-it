import { type QueryParams } from '../../interface'
import { db } from '../../utils'

export const getUsers = async (query: QueryParams) => {
	const { search = '', page = '1', perPage = '10' } = query
	return db.user.findMany({
		where: {
			username: {
				contains: search.trim(),
				mode: 'insensitive',
			},
		},
		skip: (Number(page) - 1) * Number(perPage),
		take: Number(perPage),
	})
}

export const getUsersCount = async (query: QueryParams) => {
	const { search = '' } = query

	return db.user.count({
		where: {
			username: {
				contains: search.trim(),
				mode: 'insensitive',
			},
		},
	})
}

export const getUser = async (userId: string) => {
	return db.user.findUnique({
		where: {
			id: userId,
		},
	})
}
