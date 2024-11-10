import type { Like } from '../../prisma/client'
import type { ISearchUser, ISearchUserDTO } from '../user/user.interface'

export interface IWhoLikes extends Like {
	user: ISearchUser
}

export interface IWhoLikesDTO extends ISearchUserDTO {}
