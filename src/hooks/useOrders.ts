import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { ANSWER_LOCAL_KEY } from '@/config/_variables.config'
import { ToastError } from '@/config/helpers'

import { EnumSellerStatus, RootRequest } from '@/models/request.model'
import {
	OrderStatusPayload,
	orderSellerService
} from '@/services/seller-order.service'

export function useWaitingOrders() {
	const [page, setPage] = useState(1)
	const { data, isLoading } = useQuery({
		queryKey: ['waiting-orders', page],
		queryFn: () => orderSellerService.getWaitingOrders(page)
	})
	const count_pages = getCountPages(data)
	return {
		data: data?.results,
		isLoading,
		count_pages,
		setPage,
		page
	}
}

export function useAllOrders() {
	const [page, setPage] = useState(1)
	const { data, isLoading } = useQuery({
		queryKey: ['all-orders', page],
		queryFn: () => orderSellerService.getAllOrders(page)
	})

	const count_pages = getCountPages(data)

	return { data: data?.results, isLoading, setPage, count_pages, page }
}

export function usePlacedOrders() {
	const [page, setPage] = useState(1)
	const { data, isLoading } = useQuery({
		queryKey: ['placed-orders', page],
		queryFn: () => orderSellerService.getPlacedOrders(page)
	})
	const count_pages = getCountPages(data)
	return { data: data?.results, isLoading, count_pages, setPage, page }
}

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
	const actual_orders = data?.filter(
		el => el.seller_status === EnumSellerStatus.ALL
	)
	const completed_orders = data?.filter(
		el => el.seller_status === EnumSellerStatus.COMPLETED
	)

	return {
		waiting_orders,
		actual_orders,
		completed_orders,
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

function getCountPages(data: RootRequest | undefined): number {
	return data?.count ? Math.ceil(data.count / 15) : 1
}
