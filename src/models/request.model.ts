export interface IRequest {
	id: number
	order: IOrder
	status: number
	status_label: string
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
	body?: IBody
	VIN?: string
	condition?: 0 | 1
	created_at: string
	order_sellers: OrderSeller[]
	status: number
	status_label: string
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

///
