export interface IRequestForm {
	id?: number
	brand: string
	model: string
	year: string
	description: string
	volume: string
	country?: string
	body?: string
	VIN?: string
	condition?: string
	order_images: string[]
}

export interface IRequestAdditionalForm {
	country?: string
	body?: string
	VIN?: string
	condition?: string
}

// export interface ILocaleRequest {
// 	request: IRequestForm
// 	// order_images: string[]
// }

export const condition_order = {
	0: 'Б/У',
	1: 'Новый'
}

export const condition_order_array = Object.entries(condition_order).map(el => {
	return {
		value: el[0],
		name: el[1]
	}
})
