export interface IRequestForm {
	brand: string
	model: string
	year: string
	description: string
}

export interface IRequestAdditionalForm {
	production: string[]
	body_type: string[]
	vin_code: string
	condition: string
	volume: string
}
