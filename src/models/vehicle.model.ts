export interface IVehicle {
	id: number
	brand: string
}

export interface IVehicleDetail {
	id: number
	brand: string
	models: IVehicleModel[]
}

export interface IVehicleModel {
	id: number
	model: string
	year: IVehicleYear[]
	volume: IVehicleVolume[]
}

export interface IVehicleYear {
	id: number
	year: string
}

export interface IVehicleVolume {
	id: number
	name: string
}
