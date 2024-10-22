import { PRIVATE_API } from '@/api/interceptors'

import {
	ICompletedOrder,
	IOrder,
	PlacingOrderPayload
} from '@/models/request.model'
import { IRequestForm } from '@/models/value-interfaces/request.values'

class RequestService {
	private BASE_URL = 'account/buyer/order/'

	async getRequests() {
		const response = await PRIVATE_API.get<IOrder[]>(this.BASE_URL)

		return response.data
	}

	async getRequestDetail(id: number | string) {
		const response = await PRIVATE_API.get<IOrder>(this.BASE_URL + `${id}/`)

		return response.data
	}
	async getCompletedRequests() {
		const response = await PRIVATE_API.get<ICompletedOrder[]>(
			this.BASE_URL + 'complete/'
		)

		return response.data
	}

	async getCompletedRequestDetail(id: string) {
		const response = await PRIVATE_API.get<ICompletedOrder>(
			this.BASE_URL + `complete/${id}/`
		)

		return response.data
	}

	async addRequest(data: any) {
		const response = await PRIVATE_API.post(this.BASE_URL + 'create/', data)

		return response.data
	}

	async updateRequest(data: IRequestForm) {
		const response = await PRIVATE_API.put(
			this.BASE_URL + `update/${data.id}/`,
			data
		)

		return response.data
	}
	async removeRequest(id: number | string) {
		const response = await PRIVATE_API.delete(this.BASE_URL + `delete/${id}/`)

		return response.data
	}

	async placingOrder(payload: PlacingOrderPayload) {
		const response = await PRIVATE_API.put(
			this.BASE_URL + `select/${payload.order_id}/`,
			payload.address
		)

		return response.data
	}
}

export const requestService = new RequestService()
