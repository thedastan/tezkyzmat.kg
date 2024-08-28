'use client'

import { Box, Button, Container, Flex, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
	IoIosArrowDropleftCircle,
	IoIosArrowDroprightCircle
} from 'react-icons/io'

import Spinner from '@/components/loader/spinner'
import HeaderComponent from '@/components/navbar/header-component'
import MarketCard from '@/components/ui/card/market-card'
import EmptyText from '@/components/ui/texts/EmptyText'

import { useMarketShop } from '@/hooks/useShop'

const MarkerComponent = () => {
	const [page, setPage] = useState(1)
	const { data, list, count_pages, isLoading } = useMarketShop(page)
	useEffect(() => {
		window.scroll(0, 0)
	}, [page])
	return (
		<Box
			bg='#F4F5F7'
			minH='90vh'
		>
			{isLoading && <Spinner />}
			<Container>
				<HeaderComponent title='Магазины' />
				{!isLoading && !list?.length && <EmptyText />}
				<Stack spacing='10px'>
					{list?.map(el => (
						<MarketCard
							key={el.market}
							el={el}
						/>
					))}
				</Stack>

				{!isLoading && !!list?.length && (
					<Flex
						pt='2'
						pb='4'
						gap='2'
						justifyContent='center'
						alignItems='center'
					>
						<Box
							onClick={() => page > 1 && setPage(page - 1)}
							fontSize='26px'
							cursor='pointer'
							opacity={page > 1 ? '1' : '.8'}
							_active={{ opacity: '.8' }}
						>
							<IoIosArrowDropleftCircle color='#F9BD15' />
						</Box>
						<Text
							fontSize='14px'
							color='#00000080'
						>
							{`${page}/${count_pages}`}
						</Text>
						<Box
							onClick={() => page < count_pages && setPage(page + 1)}
							fontSize='26px'
							cursor='pointer'
							opacity={page < count_pages ? '1' : '.8'}
							_active={{ opacity: '.8' }}
						>
							<IoIosArrowDroprightCircle color='#F9BD15' />
						</Box>
					</Flex>
				)}
			</Container>
		</Box>
	)
}

export default MarkerComponent
