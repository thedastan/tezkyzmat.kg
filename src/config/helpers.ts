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
