import type { Follow } from '../../prisma/client'
import type { ISearchUser, ISearchUserDTO } from '../user/user.interface'

export interface IFollow extends Follow {
	follower: ISearchUser
	following: ISearchUser
}

export interface IFollowerDTO extends ISearchUserDTO {}

export interface IFollowingDTO extends ISearchUserDTO {}
