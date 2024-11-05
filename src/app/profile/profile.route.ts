import { Router } from 'express'

import { validateRequest, isOwnerProfile } from '../../middleware'
import { catchAsync } from '../../utils'

import {
	createProfile,
	getProfiles,
	getProfile,
	updateProfile,
} from './profile.controller'
import { createProfileSchema, updateProfileSchema } from './profile.request'

const route = Router()

route.post('/', validateRequest(createProfileSchema), catchAsync(createProfile))
route.get('/:profileId', catchAsync(getProfile))
route.get('/', catchAsync(getProfiles))
route.patch(
	'/:profileId',
	isOwnerProfile,
	validateRequest(updateProfileSchema),
	catchAsync(updateProfile),
)

export default route
