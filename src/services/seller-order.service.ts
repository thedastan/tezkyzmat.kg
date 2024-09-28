import { PRIVATE_API } from '@/api/interceptors'

import {
	IRequest,
	RootRequest,
	SellerOrderStatusType
} from '@/models/request.model'

export interface OrderStatusPayload {
	id: number
	status: SellerOrderStatusType
}

class OrderSellerService {
	private BASE_URL = 'account/seller/order/'

	async getOrders() {
		const response = await PRIVATE_API.get<IRequest[]>(this.BASE_URL)

		return response.data
	}

	async getPlacedOrders(page: number) {
		const response = await PRIVATE_API.get<RootRequest>(
			this.BASE_URL + `placed/?page=${page}`
		)

		return response.data
	}
	async getAllOrders(page: number) {
		const response = await PRIVATE_API.get<RootRequest>(
			this.BASE_URL + `all/?page=${page}`
		)

		return response.data
	}
	async getWaitingOrders(page: number) {
		const response = await PRIVATE_API.get<RootRequest>(
			this.BASE_URL + `waiting/?page=${page}`
		)

		return response.data
	}
	async getNotfoundOrders() {
		const response = await PRIVATE_API.get<RootRequest>(
			this.BASE_URL + 'notfound/'
		)

		return response.data
	}

	async getOrderDetail(id: number | string) {
		const response = await PRIVATE_API.get<IRequest>(this.BASE_URL + `${id}/`)

		return response.data
	}
	async changeOrderStatus(data: OrderStatusPayload) {
		const response = await PRIVATE_API.put(
			this.BASE_URL + `update/${data.id}/`,
			{
				seller_status: data.status
			}
		)

		return data
	}
}

export const orderSellerService = new OrderSellerService()
