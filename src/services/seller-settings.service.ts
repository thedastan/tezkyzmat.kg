import { PRIVATE_API } from '@/api/interceptors'

import { ISettingSpare, ISettingSpareValue } from '@/models/spares.model'

class SettingsService {
	private BASE_URL = 'account/seller/spares/'

	async getSpares() {
		const response = await PRIVATE_API.get<ISettingSpare[]>(this.BASE_URL)

		return response.data
	}

	async getSpareDetail(id: number | string) {
		const response = await PRIVATE_API.get<ISettingSpare>(
			this.BASE_URL + `${id}/`
		)

		return response.data
	}

	async addSpare(data: ISettingSpareValue) {
		const response = await PRIVATE_API.post<ISettingSpareValue>(
			this.BASE_URL + 'create/',
			data
		)

		return response.data
	}

	async removeSpare(id: number | string) {
		const response = await PRIVATE_API.delete<ISettingSpareValue>(
			this.BASE_URL + `delete/${id}/`
		)

		return response.data
	}
}

export const settingsService = new SettingsService()
