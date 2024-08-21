'use client'

import { Box, Container, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import HeaderComponent from '@/components/navbar/header-component'
import RequestCardSeller from '@/components/ui/card/RequestCardSeller'

import { useOrders } from '@/hooks/useOrders'

const Requests = () => {
	const { pending_orders: data, isLoading } = useOrders()
	return (
		<Box
			bg='#F4F5F7'
			minH='100vh'
		>
			<Container>
				<HeaderComponent title='Все заявки' />
				<Stack
					spacing='10px'
					mt='1'
				>
					{data?.map(el => (
						<RequestCardSeller
							order={el}
							key={el.id}
						/>
					))}
				</Stack>
			</Container>
		</Box>
	)
}

export default Requests
