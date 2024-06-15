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
