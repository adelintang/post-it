export const MESSAGE = {
	SUCCESS: {
		CREATED: {
			USER: 'User registed successfully',
			PROFILE: 'Profile created successfully',
			PROFILE_IMAGE: 'Profile image uploaded successfully',
		},
		GET: {
			USERS: 'Users fetch successfully',
			USER: 'User fetch successfully',
			PROFILES: 'Profiles fetch successfully',
			PROFILE: 'Profile fetch successfully',
		},
		UPDATED: {
			PROFILE: 'Profile updated successfully',
			PROFILE_IMAGE: 'Profile image updated successfully',
		},
		DELETED: {
			PROFILE_IMAGE: 'Profile image deleted successfully',
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
			},
			UPDATED: {
				PROFILE: 'Update profile failed',
				PROFILE_IMAGE: 'Update profile image failed',
			},
			DELETED: {
				PRODUCT: 'Delete product failed',
				PROFILE_IMAGE: 'Delete profile image failed',
			},
		},
	},
}
