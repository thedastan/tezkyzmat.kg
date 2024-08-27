import { PRIVATE_API } from '@/api/interceptors'

import { IShop } from '@/models/shop.model'

class ShopService {
	private BASE_URL = 'account/'

	async getShop() {
		const response = await PRIVATE_API.get<IShop[]>(this.BASE_URL + 'shop/')

		return response.data
	}
}

export const shopService = new ShopService()
