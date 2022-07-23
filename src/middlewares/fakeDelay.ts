import { NextFunction, Request, Response } from 'express'
import { delay } from '../utils/delay'

export const fakeDelay = async (req: Request, res: Response, next: NextFunction) => {
	console.log('fake delay is running')
	await delay(2000)
	console.log('fake delay is end')
	next()
}

