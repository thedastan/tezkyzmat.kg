import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { ProfileUpdatePayload } from '@/models/user.model'
import { profileService } from '@/services/profile.service'

export function useProfile() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => profileService.getProfile()
	})

	return { data, isLoading }
}

export function useUpdateProfile(onSuccess?: () => void) {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['profile-update'],
		mutationFn: (data: ProfileUpdatePayload) => profileService.update(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			toast.success('Данные обновлены!')
			onSuccess && onSuccess()
		},
		onError(e) {
			ToastError(e)
		}
	})
	return { mutate, isPending }
}
