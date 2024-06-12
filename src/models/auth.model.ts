import { OtpcodeTypes } from './auth.enum'

export interface IAuthForm {
	phone: string
	password: string
}

export interface IAuthResponse {
	access: string
	refresh: string
}

export interface IOtpSend {
	type: OtpcodeTypes
	phone: string
}
