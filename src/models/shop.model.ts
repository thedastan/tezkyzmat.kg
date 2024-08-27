import { IImage } from './request.model'

export interface IShop {
	full_name: string
	phone: string
	shop: string
	address: string
	market: number
	market_name: string
	images: IImage[]
}
