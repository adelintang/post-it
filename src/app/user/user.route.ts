import { Router } from 'express'

import { hasRole } from '../../middleware'
import { catchAsync } from '../../utils'

import { getUsers, getUser } from './user.controller'

const route = Router()

route.get('/:userId', hasRole('ADMIN'), catchAsync(getUser))
route.get('/', hasRole('ADMIN'), catchAsync(getUsers))

export default route
