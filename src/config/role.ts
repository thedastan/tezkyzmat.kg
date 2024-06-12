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

export type RoleTypes =
	| typeof EnumRole.SUPERADMIN
	| typeof EnumRole.CLIENT
	| typeof EnumRole.SELLER
	| typeof EnumRole.LOGISTICIAN
