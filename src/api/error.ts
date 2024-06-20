import { redirect } from 'next/navigation'
import { toast } from 'sonner'

import { PUBLIC_PAGES } from '@/config/pages-url.config'

import { removeFromStorage } from '@/services/auth-token.services'

export const errorCatch = (error: any): string => {
	const message = error?.response?.data?.message

	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message
}

export const errorUserNotFound = (error: any) => {
	if (error.response?.data?.code === 'user_not_found') {
		toast.error(error.response?.data?.detail)
		removeFromStorage()
		redirect(PUBLIC_PAGES.HOME)
	}
}
