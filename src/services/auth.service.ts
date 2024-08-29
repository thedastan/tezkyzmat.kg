import { PUBLIC_API } from '@/api/interceptors'

import { getAccessToken, saveTokenStorage } from './auth-token.services'
import {
	IAuthForm,
	IAuthResponse,
	IOtpSend,
	IRegisterResponse
} from '@/models/auth.model'
import { IRegisterClient, IRegisterSeller } from '@/models/register.model'

export const authService = {
	// client
	async register(data: IRegisterClient | IRegisterSeller) {
		const response = await PUBLIC_API.post<IRegisterResponse>(
			`account/register/`,
			data
		)
		return response.data.otp
	},

	async login(data: IAuthForm) {
		const response = await PUBLIC_API.post<IAuthResponse>(
			`account/token/access/`,
			data
		)
		if (response.data.access) saveTokenStorage(response.data)
	},

	async sendOtpCode(data: IOtpSend) {
		const response = await PUBLIC_API.post<IAuthResponse>(
			`account/otp/send/`,
			data
		)
		if (response.data.access) saveTokenStorage(response.data)
	},

	async verify(code: string) {
		const response = await PUBLIC_API.post<IAuthResponse>(
			`account/otp/verify/`,
			{
				code
			}
		)
		if (response.data.access) saveTokenStorage(response.data)
	},

	// update token
	async getNewTokens() {
		const response = await PUBLIC_API.post<IAuthResponse>(
			'account/token/refresh/',
			{
				refresh: getAccessToken()
			}
		)

		if (response.data.access) saveTokenStorage(response.data)

		return response
	}
}
