import { PRIVATE_API } from '@/api/interceptors'

import { IRequest } from '@/models/request.model'

export interface OrderStatusPayload {
	id: number
	status: 0 | 1 | 2
}

class OrderSellerService {
	private BASE_URL = 'account/seller/order/'

	async getOrders() {
		const response = await PRIVATE_API.get<IRequest[]>(this.BASE_URL)

		return response.data
	}

	async getOrderDetail(id: number | string) {
		const response = await PRIVATE_API.get<IRequest>(this.BASE_URL)

		return response.data
	}
	async changeOrderStatus(data: OrderStatusPayload) {
		const response = await PRIVATE_API.put(
			this.BASE_URL + `update/${data.id}/`,
			{
				status: data.status
			}
		)

		return response.data
	}
}

export const orderSellerService = new OrderSellerService()
