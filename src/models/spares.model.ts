export interface ISpareData {
	id: number
	name: string
}

export interface ISpareBody extends ISpareData {}

export interface ISpareCountry extends ISpareData {}

export interface ISettingSpare {
	id: number
	brand: number | string[]
	model: number | string[]
	year: number[] | string[]
}
export interface ISettingSpareValue {
	brand: number
	model: number
	year: number[]
}
