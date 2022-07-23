import express, { Request, Response } from 'express'
import { user, jwt } from '../db/user.json'

const router = express.Router()

router.post('/', (req: Request, res: Response) => {
	const { username, password } = req.body

	if (!username && !password) {
		return res.status(401).send({
			message: 'Body is required',
		})
	}

	if (user.username !== username) {
		return res.status(401).send({
			message: 'Username is incorrect',
		})
	}

	if (user.password !== password) {
		return res.status(401).send({
			message: 'Password is incorrect',
		})
	}

	res.status(200).send({
		user,
		jwt,
	})
})

router.post('/jwt', (req: Request, res: Response) => {
	const token = req.headers.authorization

	if (!token) {
		return res.status(401).send({
			message: 'token not detected',
		})
	}

	if (token !== jwt) {
		return res.status(401).send({
			message: 'token not detected',
		})
	}

	res.status(200).send({
		user,
		jwt,
	})
})

export default router
