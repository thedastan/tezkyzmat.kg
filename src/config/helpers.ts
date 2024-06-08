import { toast } from 'sonner';


export function ToastError(e: any) {    
	toast.error(
		e.response?.data?.email ||
			e.response?.data?.detail ||
			e.response?.data?.message
	)
}


export const getPadTime = (time: number) => {
	return time.toString().padStart(2, '0')
}