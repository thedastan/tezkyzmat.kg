import PlacingAnOrder from '.'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { AGREED_SELLER_DATA_KEY } from '@/config/_variables.config'

import { ILocaleOrderSeller } from '@/models/request.model'

const PlacingOrderMain = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [seller, setSeller] = useState<ILocaleOrderSeller | undefined>(
		undefined
	)

	useEffect(() => {
		const handleVisibilityChange = () => {
			const agreed_seller = JSON.parse(
				localStorage.getItem(AGREED_SELLER_DATA_KEY) as any
			) as ILocaleOrderSeller | undefined
			setSeller(agreed_seller)
			if (!document.hidden && !!agreed_seller?.id) {
				onOpen()
			}
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)
		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
		}
	}, [])
	return (
		<PlacingAnOrder
			isOpen={isOpen}
			onClose={onClose}
			seller={seller}
		/>
	)
}

export default PlacingOrderMain
