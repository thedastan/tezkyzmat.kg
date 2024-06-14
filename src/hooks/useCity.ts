import { useQuery } from '@tanstack/react-query'

import { ICity } from '@/models/city.model'
import { ISpareData } from '@/models/spares.model'
import { cityService } from '@/services/city.service'

export function useCity(cityId: number | string) {
	const { data, isLoading } = useQuery({
		queryKey: ['city'],
		queryFn: () => cityService.getCity()
	})
	const city: ISpareData[] | undefined = data?.map(el => {
		return { id: el.id, name: el.name }
	})

	const markets: ISpareData[] | undefined = data?.find(
		el => el.id === Number(cityId)
	)?.markets

	return { city, markets, isLoading }
}
