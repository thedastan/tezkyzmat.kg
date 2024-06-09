export type RoleTypes = '0' | '1'

export function saveRole(role: RoleTypes) {
	localStorage.setItem('role', role)
}

export function getRole() {
	return JSON.parse(localStorage.getItem('role') as string)
}
