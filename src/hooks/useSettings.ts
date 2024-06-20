import { useMutation, useQuery } from '@tanstack/react-query'
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

export function useSellerSpareAdd(success: () => void) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['add-seller'],
		mutationFn: (data: ISettingSpareValue) => settingsService.addSpare(data),
		onSuccess() {
			success()
			toast.success('Настройка изменена')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}
