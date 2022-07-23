import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import loginRoutes from './routers/login.routes'
import { auth, fakeDelay, logger } from './middlewares'
import homeworksRoutes from './routers/homeworks.routes'

dotenv.config()

const PORT = process.env.PORT || 8080

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(logger)
server.use(fakeDelay)

server.use('/auth/login', loginRoutes)
server.use('/homeworks', homeworksRoutes)

server.listen(PORT, () => {
	console.log('Server is running on http://localhost:' + PORT)
})
