import { PRIVATE_API } from '@/api/interceptors'

import { ILogistItem } from '@/models/logist.model'

class LogisticianService {
	private BASE_URL = 'account/logistician/'

	async getOrders() {
		const response = await PRIVATE_API.get<ILogistItem[]>(
			this.BASE_URL + 'order/'
		)

		return response.data
	}

	async update(id: number) {
		const response = await PRIVATE_API.put(
			this.BASE_URL + `order/update/${id}/`
		)

		return response.data
	}
}

export const logisticianService = new LogisticianService()
