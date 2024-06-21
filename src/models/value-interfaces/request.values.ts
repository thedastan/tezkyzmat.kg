import { ISpareBody, ISpareCountry } from '../spares.model'

export interface IRequestForm {
	brand: string
	model: string
	year: string
	description: string
	volume: string
}

export interface IRequestAdditionalForm {
	production: ISpareCountry[]
	body_type: ISpareBody[]
	vin_code: string
	condition: string
}
