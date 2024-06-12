import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { IOtpSend } from '@/models/auth.model'
import { IRegisterClient, IRegisterSeller } from '@/models/register.model'
import { authService } from '@/services/auth.service'

export function useRegister(success: () => void) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IRegisterClient | IRegisterSeller) =>
			authService.register(data),
		onSuccess() {
			success()
			toast.success('На вашу почту отпарили код. Проверьте')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}

export function useVerify(success: () => void, error?: () => void) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['verify'],
		mutationFn: (code: string) => authService.verify(code),
		onSuccess() {
			success()
			toast.success('Вы успешно зарегистрировались. Подождите...')
		},
		onError(e) {
			ToastError(e)
			error && error()
		}
	})

	return { mutate, isPending }
}

export function useOtpSent(success: () => void) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['otp-send'],
		mutationFn: (data: IOtpSend) => authService.sendOtpCode(data),
		onSuccess() {
			success()
			toast.success('На вашу почту отпарили код. Проверьте')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}
