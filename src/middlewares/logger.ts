import { NextFunction, Request, Response } from 'express'

export const logger = (req: Request, res: Response, next: NextFunction) => {
	const { method, url, params, body, query } = req
	console.log('logger', { method, url, params, body, query })
	next()
}
