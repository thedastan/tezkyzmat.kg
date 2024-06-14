import { PUBLIC_API } from '@/api/interceptors'

import { ICity } from '@/models/city.model'

class CityService {
	private BASE_URL = 'account/'

	async getCity() {
		const response = await PUBLIC_API.get<ICity[]>(this.BASE_URL + 'city/')

		return response.data
	}
}

export const cityService = new CityService()
