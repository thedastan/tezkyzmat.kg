import { useParams, useSearchParams } from 'next/navigation'

import { RoleTypes } from '@/config/role'

export function useRoleParams() {
	const searchParams = useSearchParams()
	const role = searchParams.get('role')
	return useParams() as { role?: RoleTypes }
}
