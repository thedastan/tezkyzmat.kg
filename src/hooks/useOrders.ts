import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { EnumOrderStatus } from '@/models/request.model'
import {
	OrderStatusPayload,
	orderSellerService
} from '@/services/order.service'

export function useOrders() {
	const { data, isLoading } = useQuery({
		queryKey: ['orders'],
		queryFn: () => orderSellerService.getOrders()
	})

	const found_orders = data?.filter(el => el.status === EnumOrderStatus.YES)
	const pending_orders = data?.filter(
		el => el.status === EnumOrderStatus.IN_SEARCH
	)

	return { found_orders, pending_orders, isLoading }
}

export function useOrderDetail(id: number | string) {
	const { data, isLoading } = useQuery({
		queryKey: ['order-detail'],
		queryFn: () => orderSellerService.getOrderDetail(id)
	})

	return { data, isLoading }
}

export function useOrderChangeStatus() {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['order-status'],
		mutationFn: (data: OrderStatusPayload) =>
			orderSellerService.changeOrderStatus(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['orders'] })
			toast.success('Спасибо за ответ')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}
