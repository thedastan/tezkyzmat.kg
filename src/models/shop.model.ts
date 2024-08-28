import { IImage } from './request.model'

export interface RootShop {
	count: number
	next: string
	previous: any
	results: IShop[]
}

export interface IShop {
	full_name: string
	phone: string
	shop: string
	address: string
	market: number
	market_name: string
	images: IImage[]
}
