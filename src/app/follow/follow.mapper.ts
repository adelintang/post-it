import { searchUserDTOMapper } from '../user/user.mapper'

import type { IFollow, IFollowerDTO, IFollowingDTO } from './follow.interface'

export const followersDTOMapper = (follows: IFollow[]): IFollowerDTO[] => {
	return follows.map((follow) => searchUserDTOMapper(follow.follower))
}

export const followingsDTOMapper = (follows: IFollow[]): IFollowingDTO[] => {
	return follows.map((follow) => searchUserDTOMapper(follow.following))
}
