import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { requestService } from '@/services/request.service'

export function useRequest() {
	const { data, isLoading } = useQuery({
		queryKey: ['requests'],
		queryFn: () => requestService.getRequests()
	})

	return { data, isLoading }
}

export function useRequestDetail(id: number | string) {
	const { data, isLoading } = useQuery({
		queryKey: ['request-detail'],
		queryFn: () => requestService.getRequestDetail(id)
	})

	return { data, isLoading }
}

export function useRequestAdd(success?: () => void) {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['add-request'],
		mutationFn: (data: any) => requestService.addRequest(data),
		onSuccess() {
			success && success()
			queryClient.invalidateQueries({ queryKey: ['requests'] })
			toast.success('Заявка отправляется..')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}

export function useRequestRemove(success?: () => void) {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['remove-request'],
		mutationFn: (id: string | number) => requestService.removeRequest(id),
		onSuccess() {
			success && success()
			queryClient.invalidateQueries({ queryKey: ['requests'] })
			toast.success('Заявка удалена')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { remove: mutate, isPending }
}