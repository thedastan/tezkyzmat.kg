import { RoleTypes } from '@/config/role'

export type UserTypes = 'client' | 'seller'

export interface IProfile {
	phone: string
	role: RoleTypes
	role_label: string
	profile: ISellerProfile | IClientProfile
}

export interface ISellerProfile {
	full_name: string
	address: string
	shop: string
	city: number
	market: number
	images: any[]
}

export interface IClientProfile {
	full_name: string
}
