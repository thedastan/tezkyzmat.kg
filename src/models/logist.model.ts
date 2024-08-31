import { IVolume } from './request.model'
import { IBrand, IModel, IYear } from './spares.model'

export interface ILogistItem {
	id: number
	seller: Seller
	order: ILogistOrder
	is_taken: boolean
	is_sent: boolean
	created_at: string
}

export interface Seller {
	full_name: string
	phone: string
	address: string
}

export interface ILogistOrder {
	id: number
	buyer: Buyer
	brand: IBrand
	model: IModel
	year: IYear
	volume?: IVolume
	description: string
	created_at: string
}

export interface Buyer {
	full_name: string
	phone: string
	address?: string
}

export interface LogistUpdatePayload {
	id: number
	is_taken: boolean
	is_sent: boolean
	courier_name?: string
	courier_phone?: string
	courier_payment?: string
	order_seller_images?: string[]
}
