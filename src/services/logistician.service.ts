import { PRIVATE_API } from '@/api/interceptors'

import { ILogistItem, LogistUpdatePayload } from '@/models/logist.model'

class LogisticianService {
	private BASE_URL = 'account/logistician/'

	async getOrders() {
		const response = await PRIVATE_API.get<ILogistItem[]>(
			this.BASE_URL + 'order/'
		)

		return response.data
	}

	async update(data: LogistUpdatePayload) {
		const response = await PRIVATE_API.patch(
			this.BASE_URL + `order/update/${data.id}/`,
			data
		)

		return response.data
	}
}

export const logisticianService = new LogisticianService()
