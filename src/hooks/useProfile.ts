import { useQuery } from '@tanstack/react-query'

import { profileService } from '@/services/profile.service'

export function useProfile() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => profileService.getProfile()
	})

	return { data, isLoading }
}
