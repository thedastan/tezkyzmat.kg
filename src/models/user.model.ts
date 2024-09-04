import { ProfileUserTypes, RoleTypes } from '@/config/role'

export type UserTypes = 'client' | 'seller'

export interface IProfile {
	phone: string
	role: RoleTypes
	role_label: string
	profile?: IProfileItems
}

export interface IProfileItems {
	full_name: string
	address?: string
	shop?: string
	city?: number
	market?: number
	images?: any[]
}

export interface ProfileUpdatePayload {
	type: ProfileUserTypes
	payload: {
		phone: string
		profile: IProfileItems
	}
}
