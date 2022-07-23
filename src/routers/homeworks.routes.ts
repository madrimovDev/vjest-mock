import exress from 'express'
import { auth } from '../middlewares'
import MakeHomework from '../models/mockHomework'
import isNumeric from '../utils/isNumeric'

const route = exress.Router()

route.use(auth)

type QueryParams = {
	w: 'actual' | 'next' | 'prev'
	page: string
	limit: string
}

route.get('/:userId', (req, res) => {
	const { userId } = req.params
	const { w, page, limit } = req.query as unknown as QueryParams

	const actual = new MakeHomework().actualHomework()
	const prev = new MakeHomework().prevHomework()
	const next = new MakeHomework().nextHomework()

	if (!userId || !w) {
		return res.status(400).send({
			message: 'Bad request',
		})
	}

	if (page && limit) {
		if (!isNumeric(page) || !isNumeric(limit)) {
			console.log(isNumeric(limit), page)
			return res.send({
				message: 'Page or Limit not a number',
			})
		}

		const startIndex = (+page - 1) * +limit
		const endIndex = +page * +limit

		const homeworks = w === 'actual' ? actual : w === 'next' ? next : prev

    const results: any = {}
    
		if (endIndex < homeworks.length) {
			results.next = {
				page: +page + 1,
				limit: limit,
			}
		}

		if (startIndex > 0) {
			results.previous = {
				page: +page - 1,
				limit: limit,
			}
		}
		results.results = homeworks.slice(startIndex, endIndex)

		res.status(200).json({
			homeworks: results,
			count: results.results.length,
			title: w,
		})
		return
	}

	if (w == 'actual') {
		return res.send(actual)
	}
	if (w === 'next') {
		return res.send(next)
	}
	if (w === 'prev') {
		return res.send(prev)
	}
})

export default route
