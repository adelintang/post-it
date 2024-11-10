import { searchUserDTOMapper } from '../user/user.mapper'

import type { IWhoLikes, IWhoLikesDTO } from './like.interface'

export const whoLikesDTOMapper = (likes: IWhoLikes[]): IWhoLikesDTO[] => {
	return likes.map((like) => searchUserDTOMapper(like.user))
}
