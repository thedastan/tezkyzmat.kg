import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { logisticianService } from '@/services/logistician.service'

export function useLogistOrder() {
	const { data, isLoading } = useQuery({
		queryKey: ['logistician-orders'],
		queryFn: () => logisticianService.getOrders()
	})

	return { data, isLoading }
}

export function useOrderChangeStatus() {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['order-status'],
		mutationFn: (data: any) => logisticianService.update(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['logistician-orders'] })
			toast.success('Спасибо за ответ')
		},
		onError(e) {
			ToastError(e)
		}
	})
	return { mutate, isPending }
}
