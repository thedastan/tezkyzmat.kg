export interface IRequest {
	id: number
	brand: Brand
	model: Model
	year: Year
	volume: Volume
	description: string
}

export interface Brand {
	id: number
	brand: string
}

export interface Model {
	id: number
	model: string
}

export interface Year {
	id: number
	year: string
}

export interface Volume {
	id: number
	name: string
}
