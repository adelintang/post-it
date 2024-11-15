import { type NextFunction, Router, type Request, type Response } from 'express'

import authRoute from '../app/auth/auth.route'
import commentRoute from '../app/comment/comment.route'
import postRoute from '../app/post/post.route'
import profileRoute from '../app/profile/profile.route'
import userRoute from '../app/user/user.route'
import { ERROR_CODE } from '../interface'
import { AppError, authentication } from '../middleware'
import { ResponseHandler } from '../utils'

const route = Router()

route.use('/auth', authRoute)
route.use('/users', authentication, userRoute)
route.use('/profiles', authentication, profileRoute)
route.use('/posts', authentication, postRoute)
route.use('/comments', authentication, commentRoute)

route.get('/', (req: Request, res: Response) => {
	ResponseHandler.ok(res, null, 'Welcome to Post It Api')
})

route.use('*', (req: Request, res: Response, next: NextFunction) => {
	const error = new AppError(ERROR_CODE.NOT_FOUND.code)
	next(error)
})

export default route
