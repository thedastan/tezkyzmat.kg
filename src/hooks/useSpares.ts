import { useQuery } from '@tanstack/react-query'

import { spareService } from '@/services/spare.service'

export function useCountry() {
	const { data, isLoading } = useQuery({
		queryKey: ['country'],
		queryFn: () => spareService.getCountries()
	})

	return { country: data, isLoading }
}

export function useBody() {
	const { data, isLoading } = useQuery({
		queryKey: ['body'],
		queryFn: () => spareService.getBody()
	})

	return { body: data, isLoading2: isLoading }
}
