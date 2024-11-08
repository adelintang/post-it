export const MESSAGE = {
	SUCCESS: {
		CREATED: {
			USER: 'User registed successfully',
			PROFILE: 'Profile created successfully',
			PROFILE_IMAGE: 'Profile image uploaded successfully',
			FOLLOW: 'Following user successfully',
			POST: 'Post created successfully',
		},
		GET: {
			USERS: 'Users fetch successfully',
			PROFILE: 'Profile fetch successfully',
			FOLLOWERS: 'Followers fetched successfully',
			FOLLOWINGS: 'Followings fetched successfully',
			FOLLOWS_COUNT: 'Follower and following count fetched successfully',
			POSTS: 'Posts fetch successfully',
			POST: 'Post fetch successfully',
		},
		UPDATED: {
			PROFILE: 'Profile updated successfully',
			PROFILE_IMAGE: 'Profile image updated successfully',
			POST: 'Post updated successfully',
		},
		DELETED: {
			PROFILE_IMAGE: 'Profile image deleted successfully',
			UNFOLLOW: 'Unfollow user successfully',
			POST: 'Post deleted successfully',
		},
		LOGIN: 'User login successfully',
		ACCESS_TOKEN: 'Access token created successfully',
	},
	ERROR: {
		UNAUTHORIZED: {
			NO_TOKEN: 'Token not provided',
			INVALID_TOKEN: 'Token Invalid',
			LOGIN_FAILED: 'Email or password wrong',
		},
		FORBIDDEN: 'User have not permission',
		BAD_REQUEST: {
			EMAIL: 'Email already used',
			USERNAME: 'Username already used',
		},
		NOT_FOUND: {
			USER: 'User not found',
			PROFILE: 'Profile not found',
			PROFILE_IMAGE: 'Profile image not found',
			FOLLOW: 'Follow not found',
			POST: 'Post not found',
		},
		FILE: {
			NOT_PROVIDED: 'Please upload a file',
			INVALID_TYPE: 'Invalid file type',
			TO_LARGE: 'File size is too large. Maximum allowed size is 2MB.',
		},
		BODY: {
			INVALID_JSON_PAYLOAD: 'Invalid JSON payload passed.',
		},
		TOO_MANY_REQUESTS: {
			COMMON: 'You sent too many requests.',
			LOGIN: 'You are sending too many login requests',
		},
		INTERNAL_SERVER_ERROR: {
			CREATED: {
				USER: 'Create user failed',
				PROFILE: 'Create profile failed',
				PROFILE_IMAGE: 'Create profile image failed',
				FOLLOW: 'Following user failed',
				POST: 'Create post failed',
			},
			UPDATED: {
				PROFILE: 'Update profile failed',
				PROFILE_IMAGE: 'Update profile image failed',
				POST: 'Update post failed',
			},
			DELETED: {
				PRODUCT: 'Delete product failed',
				PROFILE_IMAGE: 'Delete profile image failed',
				UNFOLLOW: 'Unfollow user failed',
				POST: 'Delete post failed',
			},
		},
	},
}
