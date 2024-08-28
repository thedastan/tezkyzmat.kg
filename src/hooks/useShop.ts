import { useQuery } from '@tanstack/react-query'

import { shopService } from '@/services/shop.service'

export function useMarketShop(page: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['shop', page],
		queryFn: () => shopService.getShop(page)
	})

	const count_pages = data?.count ? Math.ceil(data?.count / 10) : 1

	return { data, list: data?.results, count_pages, isLoading }
}
