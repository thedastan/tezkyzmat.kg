import { PUBLIC_API } from '@/api/interceptors'

import { ISpareBody, ISpareCountry } from '@/models/spares.model'

class SparesService {
	private BASE_URL = 'spare/'

	async getCountries() {
		const response = await PUBLIC_API.get<ISpareCountry[]>(
			this.BASE_URL + 'country/'
		)

		return response.data
	}

	async getBody() {
		const response = await PUBLIC_API.get<ISpareBody[]>(this.BASE_URL + `body/`)

		return response.data
	}
}

export const spareService = new SparesService()
