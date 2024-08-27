import { useQuery } from '@tanstack/react-query'

import { shopService } from '@/services/shop.service'

export function useMarketShop() {
	const { data, isLoading } = useQuery({
		queryKey: ['shop'],
		queryFn: () => shopService.getShop()
	})

	return { data, isLoading }
}
