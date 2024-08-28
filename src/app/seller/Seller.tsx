'use client'

import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import BlackInterface from '@/components/layouts/black-interface'
import RequestCardSeller from '@/components/ui/card/RequestCardSeller'
import Description from '@/components/ui/texts/Description'

import EmptySvg from '@/assets/img/empty-seller-order.svg'

import { NAVBAR_HEIGHT } from '@/config/_variables.config'
import { SELLER_PAGES } from '@/config/pages-url.config'
import { EnumRole } from '@/config/role'

import { useOrders } from '@/hooks/useOrders'

import { saveUserRole } from '@/services/role.service'

const Seller = () => {
	const { push } = useRouter()
	const { pending_orders: data, isLoading } = useOrders()
	useEffect(() => {
		saveUserRole(EnumRole.SELLER)
	}, [])
	return (
		<BlackInterface
			buttonFn={() => push(SELLER_PAGES.REQUESTS)}
			buttonText='Посмотреть все заявки'
			role={EnumRole.SELLER}
		>
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

function EmptyOrder() {
	return (
		<Flex
			flexDirection='column'
			alignItems='center'
			textAlign='center'
			gap='33px'
			h='100%'
			justifyContent='center'
			mt='60px'
		>
			<Image
				src={EmptySvg}
				alt='empty'
			/>
			<Description maxW='294px'>
				Заявок пока нет, но это временно. Мы уведомим вас о новых запросах.
			</Description>
		</Flex>
	)
}

export default Seller
