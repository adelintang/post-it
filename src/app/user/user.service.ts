import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGE, metaPagination } from '../../utils'

import { type IUserProduct } from './user.interface'
import { usersDTOMapper, userWithProductDTOMapper } from './user.mapper'
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
	return { data: usersDTOMapper(users), meta }
}

export const getUser = async (userId: string) => {
	const user = await userRepository.getUser(userId)
	if (!user) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, MESSAGE.ERROR.NOT_FOUND.USER)
	}
	return userWithProductDTOMapper(user as IUserProduct)
}
