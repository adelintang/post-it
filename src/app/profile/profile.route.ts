import { Router } from 'express'

import { DIRECTORY_NAME } from '../../interface'
import {
	validateRequest,
	isOwnerProfile,
	isOwnerProfileImage,
} from '../../middleware'
import { catchAsync, storageConfig, uploadConfig } from '../../utils'
import {
	createProfileImage,
	updateProfileImage,
	deleteProfileImage,
	getProfileImage,
} from '../profile-image/profile-image.controller'

import { createProfile, getProfile, updateProfile } from './profile.controller'
import { createProfileSchema, updateProfileSchema } from './profile.request'

const route = Router()

const storage = storageConfig(DIRECTORY_NAME.PROFILE)
const upload = uploadConfig(storage)

route.post(
	'/files/:profileId/upload',
	isOwnerProfile,
	upload.single('file'),
	catchAsync(createProfileImage),
)
route.patch(
	'/files/:profileImageId/upload',
	isOwnerProfileImage,
	upload.single('file'),
	catchAsync(updateProfileImage),
)
route.delete(
	'/files/:profileImageId',
	isOwnerProfileImage,
	catchAsync(deleteProfileImage),
)
route.get('/files/:filename', catchAsync(getProfileImage))

route.post('/', validateRequest(createProfileSchema), catchAsync(createProfile))
route.get('/:profileId', catchAsync(getProfile))
route.patch(
	'/:profileId',
	isOwnerProfile,
	validateRequest(updateProfileSchema),
	catchAsync(updateProfile),
)

export default route
