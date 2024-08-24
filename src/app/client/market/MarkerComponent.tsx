'use client'

import { Box, Container, Stack } from '@chakra-ui/react'

import HeaderComponent from '@/components/navbar/header-component'
import MarketCard from '@/components/ui/card/market-card'

const MarkerComponent = () => {
	return (
		<Box
			bg='#F4F5F7'
			minH='90vh'
		>
			{/* {isLoading && <Spinner />} */}
			<Container>
				<HeaderComponent title='Магазины' />
				<Stack spacing='10px'>
					<MarketCard />
				</Stack>
			</Container>
		</Box>
	)
}

export default MarkerComponent
