import { PRIVATE_API } from '@/api/interceptors'

import { IProfile } from '@/models/user.model'

class ProfileService {
	private BASE_URL = 'account/'

	async getProfile() {
		const response = await PRIVATE_API.get<IProfile>(this.BASE_URL + 'profile/')

		return response.data
	}
}

export const profileService = new ProfileService()
