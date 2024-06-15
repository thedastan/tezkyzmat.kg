import Cookies from 'js-cookie'

import { getUserRole } from './role.service'
import { IAuthResponse } from '@/models/auth.model'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'access',
	'REFRESH_TOKEN' = 'refresh',
	'ROLE' = 'role'
}

export const getAccessToken = () => {
	const role = getUserRole()
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN + role)
	return accessToken || null
}

export const saveTokenStorage = (tokens: IAuthResponse) => {
	// const role = getUserRole()
	const settings: Cookies.CookieAttributes = {
		sameSite: 'strict',
		expires: 1
	}
	Cookies.set(EnumTokens.ROLE, JSON.stringify(tokens.role), settings)
	Cookies.set(EnumTokens.ACCESS_TOKEN + tokens.role, tokens.access, settings)
	Cookies.set(EnumTokens.REFRESH_TOKEN + tokens.role, tokens.refresh, settings)
}

export const removeFromStorage = () => {
	const role = getUserRole()
	Cookies.remove(EnumTokens.ACCESS_TOKEN + role)
	Cookies.remove(EnumTokens.REFRESH_TOKEN + role)
}
