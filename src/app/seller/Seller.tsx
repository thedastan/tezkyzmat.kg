'use client'

import { Box, Heading, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import EmptyOrder from '@/components/empty-component/empty-order'
import BlackInterface from '@/components/layouts/black-interface'
import Spinner from '@/components/loader/spinner'
import RequestCardSeller from '@/components/ui/card/RequestCardSeller'

import { NAVBAR_HEIGHT } from '@/config/_variables.config'
import { SELLER_PAGES } from '@/config/pages-url.config'
import { EnumRole } from '@/config/role'

import { useAllOrders } from '@/hooks/useOrders'

import { saveUserRole } from '@/services/role.service'

const Seller = () => {
	const { push } = useRouter()
	const { data, isLoading } = useAllOrders()
	useEffect(() => {
		saveUserRole(EnumRole.SELLER)
	}, [])
	return (
		<BlackInterface
			buttonFn={() => push(SELLER_PAGES.REQUESTS)}
			buttonText='Посмотреть все заявки'
			role={EnumRole.SELLER}
		>
			{isLoading && <Spinner />}
			{!isLoading && !data?.length && <EmptyOrder />}
			{!!data?.length && (
				<Box pb={NAVBAR_HEIGHT}>
					<Heading
						fontWeight='700'
						fontSize='20px'
						lineHeight='16px'
						color='#1C1C1C'
					>
						Недавние
					</Heading>

					<Stack
						spacing='10px'
						mt='4'
					>
						{data.slice(0, 2).map(el => (
							<RequestCardSeller
								order={el}
								key={el.id}
							/>
						))}
					</Stack>
				</Box>
			)}
		</BlackInterface>
	)
}

export default Seller
