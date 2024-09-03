import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ANSWER_LOCAL_KEY } from '@/config/_variables.config'
import { ToastError } from '@/config/helpers'

import { EnumSellerStatus } from '@/models/request.model'
import {
	OrderStatusPayload,
	orderSellerService
} from '@/services/order.service'

export function useOrders() {
	const { data, isLoading } = useQuery({
		queryKey: ['orders'],
		queryFn: () => orderSellerService.getOrders()
	})

	const waiting_orders = data?.filter(
		el =>
			el.seller_status === EnumSellerStatus.WAITING ||
			el.seller_status === EnumSellerStatus.PLACED
	)
	const pending_orders = data?.filter(
		el => el.seller_status === EnumSellerStatus.WAITING
	)
	const completed_orders = data?.filter(
		el => el.seller_status === EnumSellerStatus.COMPLETED
	)
	const all_orders = data?.filter(
		el => el.seller_status === EnumSellerStatus.ALL
	)

	return {
		waiting_orders,
		pending_orders,
		completed_orders,
		all_orders,
		isLoading
	}
}

export function useOrderDetail(id: number | string) {
	const { data, isLoading } = useQuery({
		queryKey: ['order-detail', id],
		queryFn: () => orderSellerService.getOrderDetail(id)
	})

	return { data, isLoading }
}

export function useOrderChangeStatus(onSuccess: () => void) {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['order-status'],
		mutationFn: (data: OrderStatusPayload) =>
			orderSellerService.changeOrderStatus(data),
		onSuccess(res) {
			onSuccess()
			sessionStorage.setItem(ANSWER_LOCAL_KEY, JSON.stringify(res.status))

			queryClient.invalidateQueries({ queryKey: ['orders'] })
			toast.success('Спасибо за ответ')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}
