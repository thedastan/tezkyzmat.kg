import { PRIVATE_API } from '@/api/interceptors'

import { RootShop } from '@/models/shop.model'

class ShopService {
	private BASE_URL = 'account/'

	async getShop(page: number = 1) {
		const response = await PRIVATE_API.get<RootShop>(
			this.BASE_URL + `shop/?page=${page}`
		)

		return response.data
	}
}

export const shopService = new ShopService()
