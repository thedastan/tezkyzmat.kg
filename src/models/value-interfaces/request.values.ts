export interface IRequestForm {
	brand: string
	model: string
	year: string
	description: string
	volume: string
	country?: string
	body?: string
	VIN?: string
	condition?: string
}

export interface IRequestAdditionalForm {
	country?: string
	body?: string
	VIN?: string
	condition?: string
}

export interface ILocaleRequest {
	request: IRequestForm
	images: string[]
}
