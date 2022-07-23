import { homework } from '../db/homework.json'
import { v4 as uuidv4 } from 'uuid'

interface IHomework {
	id: string
	index: number
	userId: string
	homeworkId: string
	title: string
	description: string
	date: Date
	isActive: boolean
	isComplate: boolean
	rate: 5
}

interface IMakeHomework {
	actualHomework(): IHomework[]
	prevHomework(): IHomework[]
	nextHomework(): IHomework[]
}

class MakeHomework implements IMakeHomework {
	private today = new Date()
	private nextDay = new Date(this.today.setDate(this.today.getDay() + 3))
	private prevDay = new Date(this.today.setDate(this.today.getDay() - 3))

	private randomFlag = (num: number) => Math.ceil(Math.random() * num) % 2 === 0

	private mockDate(day: Date, random: boolean = false, limit: number = 5): IHomework[] {
		return new Array(limit).fill(homework).map((h, i) => ({
			id: uuidv4(),
			index: i + 1,
			date: day,
			description: h.description,
			title: h.title,
			homeworkId: uuidv4(),
			isActive: random ? this.randomFlag(i) : false,
			isComplate: random ? this.randomFlag(i) : false,
			rate: 5,
			userId: '123',
		}))
	}
	public actualHomework(): IHomework[] {
		return this.mockDate(this.today, true)
	}
	public prevHomework(): IHomework[] {
		return this.mockDate(this.prevDay, true, 50)
	}
	public nextHomework(): IHomework[] {
		return this.mockDate(this.nextDay, false, 50)
	}
}

export default MakeHomework
