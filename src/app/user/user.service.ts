import { type QueryParams } from '../../interface'
import { metaPagination } from '../../utils'

import type { ISearchUser } from './user.interface'
import { searchUsersDTOMapper } from './user.mapper'
import * as userRepository from './user.repository'

export const getUsers = async (query: QueryParams) => {
	const { page = '1', perPage = '10' } = query
	const [users, totalData] = await Promise.all([
		userRepository.getUsers(query),
		userRepository.getUsersCount(query),
	])
	const meta = metaPagination(
		Number(page),
		Number(perPage),
		users.length,
		totalData,
	)
	return { data: searchUsersDTOMapper(users as ISearchUser[]), meta }
}
