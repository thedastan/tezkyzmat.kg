import { PUBLIC_API } from '@/api/interceptors'

import { IVehicle, IVehicleDetail } from '@/models/vehicle.model'

class VehicleService {
	private BASE_URL = 'vehicle/'

	async getVehicles() {
		const response = await PUBLIC_API.get<IVehicle[]>(this.BASE_URL)

		return response.data
	}

	async getVehicleDetail(id: number | string) {
    if(!id) return
		const response = await PUBLIC_API.get<IVehicleDetail>(
			this.BASE_URL + `${id}/`
		)

		return response.data
	}
}

export const vehicleService = new VehicleService()
