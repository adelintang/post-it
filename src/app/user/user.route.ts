import { Router } from 'express'

import { catchAsync } from '../../utils'

import { getUsers, getUser } from './user.controller'

const route = Router()

route.get('/:userId', catchAsync(getUser))
route.get('/', catchAsync(getUsers))

export default route
