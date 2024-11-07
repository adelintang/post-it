import { Router } from 'express'

import { validateRequest } from '../../middleware'
import { catchAsync } from '../../utils'
import {
	follow,
	unfollow,
	getFollowers,
	getFollowings,
	getFollowsCount,
} from '../follow/follow.controller'
import { followSchema, unfollowSchema } from '../follow/follow.request'

import { getUsers } from './user.controller'

const route = Router()

route.get('/follows/count/:userId', catchAsync(getFollowsCount))
route.get('/followers/:userId', catchAsync(getFollowers))
route.get('/followings/:userId', catchAsync(getFollowings))
route.post('/follow', validateRequest(followSchema), catchAsync(follow))
route.delete('/unfollow', validateRequest(unfollowSchema), catchAsync(unfollow))

route.get('/', catchAsync(getUsers))

export default route
