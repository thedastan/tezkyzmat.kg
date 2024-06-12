import { RoleTypes } from '@/config/role'

export interface IRegisterClient {
	user: IUser
	full_name: string
}

export interface IRegisterSeller {
	user: IUser
	full_name: string
	address: string
	shop: string
}

interface IUser {
	phone: string
	password: string
	role: RoleTypes
}
