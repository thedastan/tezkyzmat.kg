import { toast } from 'sonner'

export function ToastError(e: any) {
	toast.error(
		e.response?.data?.email ||
			e.response?.data?.detail ||
			e.response?.data?.non_field_errors ||
			e.response?.data?.message ||
			'Произошла ошибка!'
	)
}

// non_field_errors
export const getPadTime = (time: number) => {
	return time.toString().padStart(2, '0')
}

export function getLocaleStorage(key: string) {
	return JSON.parse(localStorage.getItem(key) as any)
}

export function addLocaleStorage(key: string, data: any) {
	localStorage.setItem(key, JSON.stringify(data))
}

export function removeLocaleStorage(key: string) {
	localStorage.removeItem(key)
}
