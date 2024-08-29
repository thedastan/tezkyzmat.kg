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
		const response = await PRIVATE_API.put(
			this.BASE_URL + `order/update/${data.id}/`,
			{
				is_taken: data.is_taken,
				is_sent: data.is_sent
			}
		)

		return response.data
	}
}

export const logisticianService = new LogisticianService()
