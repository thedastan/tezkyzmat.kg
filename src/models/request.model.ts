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
	created_at: string
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

export enum EnumOrderStatus {
	IN_SEARCH = 0,
	YES = 1,
	NO = 2
}
