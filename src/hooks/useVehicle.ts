import { useQuery } from '@tanstack/react-query'

import { vehicleService } from '@/services/vehicle.service'

export function useVehicle() {
	const { data, isLoading } = useQuery({
		queryKey: ['vehicle'],
		queryFn: () => vehicleService.getVehicles()
	})

	return { data, isLoading }
}

export function useVehicleById(id: number | string) {
	const { data, isLoading } = useQuery({
		queryKey: ['vehicle-id', id],
		queryFn: () => vehicleService.getVehicleDetail(id)
	})

	return { data, isLoading2: isLoading }
}
