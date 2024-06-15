import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { mediaService } from '@/services/media.service'

export function useImagesUpload(success: Dispatch<SetStateAction<string[]>>) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: File[]) => mediaService.getMediaFiles(data),
		onSuccess(images) {
			success(state => [...state, ...images])
			toast.success('Картинки загрузились')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}
