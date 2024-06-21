export interface ISpareData {
	id: number
	name: string
}

export interface ISpareBody extends ISpareData {}

export interface ISpareCountry extends ISpareData {}

export interface ISettingSpareValue {
	brand: number
	model: number
	year: number[]
}

export interface ISettingSpare {
	id: number
	brand: IBrand
	model: IModel
	year: IYear[]
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
