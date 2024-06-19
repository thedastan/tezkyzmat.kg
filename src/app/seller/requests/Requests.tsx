'use client'

import { Box, Container, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import HeaderComponent from '@/components/navbar/header-component'
import RequestCardSeller from '@/components/ui/card/RequestCardSeller'

import { SELLER_PAGES } from '@/config/pages-url.config'

const Requests = () => {
	const { push } = useRouter()
	return (
		<Box
			bg='#F4F5F7'
			minH='100vh'
		>
			<Container>
				<HeaderComponent
					title='Все заявки'
					backFn={() => push(SELLER_PAGES.HOME)}
				/>
				<Stack
					spacing='10px'
					mt='1'
				>
					<RequestCardSeller />
				</Stack>
			</Container>
		</Box>
	)
}

export default Requests
