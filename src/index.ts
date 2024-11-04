import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

import { errorHandler } from './middleware'
import routes from './routes'
import { swaggerDocument } from './swagger'
import { limiter } from './utils'

const app = express()
const PORT = process.env.PORT ?? 3000
const HOST = process.env.HOST ?? 'http://localhost'

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

if (process.env.NODE_ENV === 'development') {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	console.log(`Swagger docs is enabled at ${HOST}:${PORT}/docs`)
}

app.use(limiter)
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server running at ${HOST}:${PORT}`)
})
