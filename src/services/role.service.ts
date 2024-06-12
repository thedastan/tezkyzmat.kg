import Cookies from 'js-cookie'

import { EnumRole, RoleTypes } from '@/config/role'

export const ROLE_KEY = 'role'
export const saveUserRole = (role: RoleTypes) => {
	Cookies.set(ROLE_KEY, JSON.stringify(role))
}

export const getUserRole = (): RoleTypes => {
	const role = Cookies.get(ROLE_KEY)
	return role ? +role : EnumRole.CLIENT
}
