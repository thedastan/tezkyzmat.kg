import { RoleTypes } from '@/config/role'

import { OtpcodeTypes } from './auth.enum'

export interface IAuthForm {
	phone: string
	password: string
	role?: RoleTypes
}

export interface IAuthResponse {
	access: string
	refresh: string
	role: RoleTypes
}

export interface IOtpSend {
	type: OtpcodeTypes
	phone: string
}

export interface IRegisterResponse {
	otp: number
	data: {
		user: {
			phone: string
			role: 2
		}
		full_name: string
		address: string
		shop: string
		city: number
		market: number
		images: string[]
	}
}

export interface ChangePasswordPayload {
	password: string
	old_password: string
}

export interface ResetPasswordPayload {
	phone: string
	code: string
	password: string
}
