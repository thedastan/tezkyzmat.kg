import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { LogistUpdatePayload } from '@/models/logist.model'
import { logisticianService } from '@/services/logistician.service'

export function useLogistOrder() {
	const { data, isLoading } = useQuery({
		queryKey: ['logistician-orders'],
		queryFn: () => logisticianService.getOrders()
	})

	return { data, isLoading }
}

export function useLogistOrderUpdateStatus(onSuccess: () => void) {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['order-status'],
		mutationFn: (data: LogistUpdatePayload) => logisticianService.update(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['logistician-orders'] })
			toast.success('Спасибо за ответ')
			onSuccess()
		},
		onError(e) {
			ToastError(e)
		}
	})
	return { mutate, isPending }
}
