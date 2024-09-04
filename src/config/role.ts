export function saveRole(role: RoleTypes) {
	localStorage.setItem('role', JSON.stringify(role))
}

export function getRole() {
	return JSON.parse(localStorage.getItem('role') as string)
}

export enum EnumRole {
	SUPERADMIN = 0, //'Супер админ'
	CLIENT = 1, //'Покупатель'
	SELLER = 2, //'Продавец'
	LOGISTICIAN = 3 //'Логист'
}

export type ProfileUserTypes = 'seller' | 'buyer'

export function getRoleByIndex(
	role: EnumRole.CLIENT | EnumRole.SELLER
): ProfileUserTypes {
	if (role === EnumRole.CLIENT) {
		return 'buyer'
	} else {
		return 'seller'
	}
}

export type RoleTypes =
	| EnumRole.SUPERADMIN
	| EnumRole.CLIENT
	| EnumRole.SELLER
	| EnumRole.LOGISTICIAN
