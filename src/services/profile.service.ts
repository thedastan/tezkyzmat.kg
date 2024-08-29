import { PRIVATE_API } from '@/api/interceptors'

import { saveTokenStorage } from './auth-token.services'
import { ChangePasswordPayload, IAuthResponse } from '@/models/auth.model'
import { IProfile } from '@/models/user.model'

class ProfileService {
	private BASE_URL = 'account/'

	async getProfile() {
		const response = await PRIVATE_API.get<IProfile>(this.BASE_URL + 'profile/')

		return response.data
	}

	async changePassword(payload: ChangePasswordPayload) {
		const response = await PRIVATE_API.put<IAuthResponse>(
			this.BASE_URL + 'password/change/',
			payload
		)

		if (response.data.access) saveTokenStorage(response.data)
	}
}

export const profileService = new ProfileService()
