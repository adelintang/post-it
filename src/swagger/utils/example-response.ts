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

const ProfileImageGeneralData = {
	id: 'profile-image-798d02f7-4d9d-4374-83ca-f054d8fc1773',
	file_url:
		'http://localhost:3000/profiles/files/file-1730907730863-7415028.jpg',
}

const ProfileGeneralData = {
	id: 'profile-c24e7a1d-997b-4d5a-a539-026d56761903',
	fullname: 'Johanes Alexandra',
	profile_image: ProfileImageGeneralData,
}

const UserGeneralData = {
	id: 'user-c8164c32-9f66-4982-aeb9-7c0fdbc2add7',
	username: 'johanes',
}

const UserData = {
	id: 'user-c8164c32-9f66-4982-aeb9-7c0fdbc2add7',
	username: 'johanes',
	profile: ProfileGeneralData,
}

const ProfileData = {
	id: 'profile-c8164c32-9f66-4982-aeb9-7c0fdbc2add7',
	bio: "I'am Student",
	fullname: 'John Doe',
	user_id: 'user-59b3da99-1505-417c-a81a-6b684458dc6c',
}

const GetProfileData = {
	id: 'profile-c24e7a1d-997b-4d5a-a539-026d56761903',
	fullname: 'Johanes Alexandra',
	bio: "I'am Student and i'am exiceted learn web dev",
	user: UserGeneralData,
	profile_image: ProfileImageGeneralData,
}

const ProfileFileData = {
	id: 'profile-image-14874ca4-d7a7-4f71-a927-e1f2bc5fc55e',
	file_url:
		'http://localhost:3000/profiles/files/file-1731341046422-455151246.jpg',
	filename: 'file-1731341046422-455151246.jpg',
	size: 6572,
	profile_id: 'profile-5128f16a-68e5-4b40-b1b8-d28a691d84da',
}

const FollowData = {
	id: 'follow-ea643e17-326d-4d17-9b52-8751cc3321e2',
	follower_id: 'user-59b3da99-1505-417c-a81a-6b684458dc6c',
	following_id: 'user-d5771ab9-25ae-4861-aa3a-f026541f0496',
	created_at: '2024-11-11T16:29:09.492Z',
	updated_at: '2024-11-11T16:29:09.492Z',
}

const FollowsCountData = {
	followers: 0,
	followings: 1,
}

const PostData = {
	id: 'post-1d6c87c5-c655-496d-8163-d3cba16f1877',
	content: 'Time to traveling',
	created_at: '2024-11-11T17:24:29.184Z',
	updated_at: '2024-11-11T17:24:29.184Z',
	user_id: 'user-59b3da99-1505-417c-a81a-6b684458dc6c',
}

const PostImageGeneralData = {
	id: 'post-image-798d02f7-4d9d-4374-83ca-f054d8fc1773',
	file_url: 'http://localhost:3000/posts/files/file-1730907730863-7415028.jpg',
}

const GetPostData = {
	id: PostData.id,
	content: PostData.content,
	created_at: PostData.created_at,
	updated_at: PostData.updated_at,
	user: UserData,
	post_image: PostImageGeneralData,
}

const GetPostsData = {
	...GetPostData,
	likesCount: 0,
	commentsCount: 0,
}

const PostFileData = {
	id: 'post-image-07b2fb9b-897d-498b-af7a-9df62246ecea',
	file_url:
		'http://localhost:3000/posts/files/file-1731349512917-710527355.jpg',
	filename: 'file-1731349512917-710527355.jpg',
	size: 5667,
	post_id: 'post-439e65d6-629c-4594-9aae-8387ba4a3fbf',
}

const CommentData = {
	id: 'comment-e4171606-b443-42c9-8ac4-a848868daea2',
	content: 'This is beautiful mount',
	user_id: 'user-59b3da99-1505-417c-a81a-6b684458dc6c',
	post_id: 'post-439e65d6-629c-4594-9aae-8387ba4a3fbf',
	parent_id: null,
	created_at: '2024-11-11T19:21:20.463Z',
	updated_at: '2024-11-11T19:21:20.463Z',
}

const GetComment = {
	id: CommentData.id,
	content: CommentData.content,
	created_at: CommentData.created_at,
	updated_at: CommentData.updated_at,
	user: UserData,
}

const GetComments = {
	...GetComment,
	likesCount: 0,
	repliesCount: 0,
}

const CreateReply = {
	...CommentData,
	content: 'Yes true!',
	parent_id: 'comment-c7b1d717-4579-4890-82bb-cac8eeb9d215',
}

const GetReplies = {
	id: CreateReply.id,
	content: CreateReply.content,
	created_at: CreateReply.created_at,
	updated_at: CreateReply.updated_at,
	user: UserData,
	likesCount: 0,
	parent_id: CreateReply.parent_id,
}

const LikeData = {
	id: 'like-5a08b839-1cb9-4967-92c3-a54c0e07c07c',
	user_id: 'user-59b3da99-1505-417c-a81a-6b684458dc6c',
	post_id: 'post-439e65d6-629c-4594-9aae-8387ba4a3fbf',
	comment_id: null,
}

const LikeCommentData = {
	...LikeData,
	post_id: null,
	comment_id: 'comment-c7b1d717-4579-4890-82bb-cac8eeb9d215',
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
	PROFILE_CREATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.PROFILE,
		data: ProfileData,
	},
	PROFILE_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.PROFILE,
		data: GetProfileData,
	},
	PROFILE_UPDATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.UPDATED.PROFILE,
		data: ProfileData,
	},
	PROFILE_IMAGE_CREATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.PROFILE_IMAGE,
		data: ProfileFileData,
	},
	PROFILE_IMAGE_UPDATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.UPDATED.PROFILE_IMAGE,
		data: ProfileFileData,
	},
	PROFILE_IMAGE_DELETED: {
		status: 'success',
		message: MESSAGE.SUCCESS.DELETED.PROFILE_IMAGE,
		data: {
			id: ProfileFileData.id,
			profile_id: ProfileFileData.profile_id,
		},
	},
	FOLLOWING: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.FOLLOW,
		data: FollowData,
	},
	UNFOLLOW: {
		status: 'success',
		message: MESSAGE.SUCCESS.DELETED.UNFOLLOW,
		data: FollowData,
	},
	FOLLOWERS_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.FOLLOWERS,
		data: [UserData],
	},
	FOLLOWINGS_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.FOLLOWINGS,
		data: [UserData],
	},
	FOLLOWS_COUNT_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.FOLLOWS_COUNT,
		data: FollowsCountData,
	},
	POST_CREATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.POST,
		data: PostData,
	},
	POST_UPDATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.UPDATED.POST,
		data: PostData,
	},
	POST_DELETED: {
		status: 'success',
		message: MESSAGE.SUCCESS.DELETED.POST,
		data: PostData,
	},
	POST_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.POST,
		data: GetPostData,
	},
	POSTS_ME_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.POSTS_ME,
		data: [GetPostsData],
		meta: Meta,
	},
	POSTS_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.POSTS,
		data: [GetPostsData],
		meta: Meta,
	},
	POST_IMAGE_CREATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.POST_IMAGE,
		data: PostFileData,
	},
	POST_IMAGE_UPDATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.UPDATED.POST_IMAGE,
		data: PostFileData,
	},
	POST_IMAGE_DELETED: {
		status: 'success',
		message: MESSAGE.SUCCESS.DELETED.POST_IMAGE,
		data: {
			id: PostFileData.id,
			post_id: PostFileData.post_id,
		},
	},
	COMMENT_CREATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.COMMENT,
		data: CommentData,
	},
	COMMENT_UPDATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.UPDATED.COMMENT,
		data: CommentData,
	},
	COMMENT_DELETED: {
		status: 'success',
		message: MESSAGE.SUCCESS.DELETED.COMMENT,
		data: CommentData,
	},
	COMMENTS_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.COMMENTS,
		data: [GetComments],
		meta: Meta,
	},
	COMMENT_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.COMMENT,
		data: GetComment,
	},
	REPLY_CREATED: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.REPLY,
		data: CreateReply,
	},
	REPLIES_GET: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.REPLIES,
		data: [GetReplies],
		meta: Meta,
	},
	LIKE_POST: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.LIKE_POST,
		data: LikeData,
	},
	UNLIKE_POST: {
		status: 'success',
		message: MESSAGE.SUCCESS.DELETED.UNLIKE_POST,
		data: LikeData,
	},
	WHO_LIKES_POST: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.WHO_LIKES_POST,
		data: [UserData],
	},
	LIKE_POST_CHECK: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.LIKE_POST_CHECK,
		data: {
			like: true,
		},
	},
	LIKE_COMMENT: {
		status: 'success',
		message: MESSAGE.SUCCESS.CREATED.LIKE_COMMENT,
		data: LikeCommentData,
	},
	UNLIKE_COMMENT: {
		status: 'success',
		message: MESSAGE.SUCCESS.DELETED.UNLIKE_COMMENT,
		data: LikeCommentData,
	},
	LIKE_COMMENT_CHECK: {
		status: 'success',
		message: MESSAGE.SUCCESS.GET.LIKE_COMMENT_CHECK,
		data: {
			like: true,
		},
	},
}
