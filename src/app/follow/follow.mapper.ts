import type { IFollow, IFollowerDTO, IFollowingDTO } from './follow.interface'

export const followersDTOMapper = (follows: IFollow[]): IFollowerDTO[] => {
	return follows.map((follow) => {
		return {
			id: follow.follower.id,
			username: follow.follower.username,
			profile: {
				id: follow.follower.profile.id,
				fullname: follow.follower.profile.fullname,
				profile_image: {
					id: follow.follower.profile.profileImage.id,
					file_url: follow.follower.profile.profileImage.file_url,
				},
			},
		}
	})
}

export const followingsDTOMapper = (follows: IFollow[]): IFollowingDTO[] => {
	return follows.map((follow) => {
		return {
			id: follow.following.id,
			username: follow.following.username,
			profile: {
				id: follow.following.profile.id,
				fullname: follow.following.profile.fullname,
				profile_image: {
					id: follow.following.profile.profileImage.id,
					file_url: follow.following.profile.profileImage.file_url,
				},
			},
		}
	})
}
