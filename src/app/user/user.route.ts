import { Router } from 'express'

import { hasRole, validateRequest } from '../../middleware'
import { catchAsync } from '../../utils'
import {
	follow,
	unfollow,
	getFollowers,
	getFollowings,
	getFollowsCount,
} from '../follow/follow.controller'
import { followSchema, unfollowSchema } from '../follow/follow.request'

import { getUsers, getUser } from './user.controller'

const route = Router()

route.get('/follows/count/:userId', catchAsync(getFollowsCount))
route.get('/followers/:userId', catchAsync(getFollowers))
route.get('/followings/:userId', catchAsync(getFollowings))
route.post('/follow', validateRequest(followSchema), catchAsync(follow))
route.delete('/unfollow', validateRequest(unfollowSchema), catchAsync(unfollow))

route.get('/:userId', hasRole('ADMIN'), catchAsync(getUser))
route.get('/', hasRole('ADMIN'), catchAsync(getUsers))

export default route
