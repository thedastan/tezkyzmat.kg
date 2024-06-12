import { RoleTypes } from '@/config/role'

import { getUserRole } from '@/services/role.service'

export function useRoles() {
	const role: RoleTypes = getUserRole()
	return { role }
}
