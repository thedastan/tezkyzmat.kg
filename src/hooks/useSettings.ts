import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { ISettingSpareValue } from '@/models/spares.model'
import { settingsService } from '@/services/seller-settings.service'

export function useSellerSpares() {
	const { data, isLoading } = useQuery({
		queryKey: ['seller-spares'],
		queryFn: () => settingsService.getSpares()
	})

	return { data, isLoading }
}

export function useSellerSpareDetail(id: number | string) {
	const { data, isLoading } = useQuery({
		queryKey: ['seller-spares-detail', id],
		queryFn: () => settingsService.getSpareDetail(id)
	})

	return { data, isLoading }
}
export function useSellerSpareAdd(success: () => void) {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['add-seller'],
		mutationFn: (data: ISettingSpareValue) => settingsService.addSpare(data),
		onSuccess() {
			success()
			queryClient.invalidateQueries({ queryKey: ['seller-spares'] })
			toast.success('Марка добавлена')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}

export function useSellerSpareRemove() {
	const { back } = useRouter()
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['remove-seller'],
		mutationFn: (id: string | number) => settingsService.removeSpare(id),
		onSuccess() {
			back()
			queryClient.invalidateQueries({ queryKey: ['seller-spares'] })
			toast.success('Марка удалена')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { remove: mutate, isPending }
}
