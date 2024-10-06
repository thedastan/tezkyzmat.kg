import { IOrderInLogist } from './logist.model'

export interface RootRequest {
	count: number
	previous: string
	next: string
	results: IRequest[]
}

export interface IRequest {
	id: number
	order: IOrder
	seller_status: SellerOrderStatusType
	seller_status_label: string
	created_at: string
}

export interface IOrder {
	id: number
	brand: IBrand
	model?: IModel
	year?: IYear
	volume?: IVolume
	description?: string
	order_images: IImage[]
	country?: ICountry
	buyer_phone: string
	body?: IBody
	VIN?: string
	condition?: 0 | 1
	created_at: string
	order_sellers: OrderSeller[]
	status: number
	status_label: string
}

export interface ICompletedOrder extends Omit<IOrder, 'order_sellers'> {
	order_sellers: IOrderInLogist[]
	region: string
	district: string
	street: string
}

export interface IBrand {
	id: number
	brand: string
}

export interface IModel {
	id: number
	model: string
}

export interface IYear {
	id: number
	year: string
}

export interface IVolume {
	id: number
	name: string
}

export interface ICountry {
	id: number
	name: string
}

export interface IImage {
	id: number
	image: string
}

export interface IBody {
	id: number
	name: string
}

export interface OrderSeller {
	id: number
	seller: string
	seller_phone: string
	status: number
	status_label: string
	created_at: string
}

export interface ILocaleOrderSeller extends OrderSeller {
	order_id: number
}

export interface PlacingOrderPayload {
	order_id: number
	address: {
		region: string
		street: string
		district: string
		order_sellers: string
	}
}

export enum EnumOrderStatus {
	IN_SEARCH = 0,
	FOUND = 1,
	NOT_FOUND = 2,
	COMPLETED = 3
}

export type OrderStatusType =
	| EnumOrderStatus.IN_SEARCH
	| EnumOrderStatus.NOT_FOUND
	| EnumOrderStatus.FOUND
	| EnumOrderStatus.COMPLETED

/// seller status
export enum EnumSellerStatus {
	ALL = 0, // 'Все'
	WAITING = 1, // 'В ожидании'
	PLACED = 2, // 'Оформлен'
	COMPLETED = 3, // 'Завершен'
	NOT_FOUND = 4 // 'Завершен'
}

export type SellerOrderStatusType =
	| EnumSellerStatus.ALL
	| EnumSellerStatus.WAITING
	| EnumSellerStatus.PLACED
	| EnumSellerStatus.COMPLETED
	| EnumSellerStatus.NOT_FOUND
