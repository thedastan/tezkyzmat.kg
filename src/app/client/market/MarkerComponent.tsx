'use client'

import { Box, Container, Stack } from '@chakra-ui/react'

import Spinner from '@/components/loader/spinner'
import HeaderComponent from '@/components/navbar/header-component'
import MarketCard from '@/components/ui/card/market-card'

import { useMarketShop } from '@/hooks/useShop'

const MarkerComponent = () => {
	const { data, isLoading } = useMarketShop()
	return (
		<Box
			bg='#F4F5F7'
			minH='90vh'
		>
			{isLoading && <Spinner />}
			<Container>
				<HeaderComponent title='Магазины' />
				<Stack spacing='10px'>
					{data?.map(el => (
						<MarketCard
							key={el.market}
							el={el}
						/>
					))}
				</Stack>
			</Container>
		</Box>
	)
}

export default MarkerComponent
