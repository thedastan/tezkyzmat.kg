'use client'

import { Box, Container, Stack } from '@chakra-ui/react'

import Spinner from '@/components/loader/spinner'
import HeaderComponent from '@/components/navbar/header-component'
import PaginationOrders from '@/components/ui/buttons/Pagination'
import RequestCardSeller from '@/components/ui/card/RequestCardSeller'
import EmptyText from '@/components/ui/texts/EmptyText'

import { useAllOrders } from '@/hooks/useOrders'

const Requests = () => {
	const { data, isLoading, count_pages, setPage, page } = useAllOrders()
	return (
		<Box
			bg='#F4F5F7'
			minH='100vh'
		>
			{isLoading && <Spinner />}
			<Container>
				<HeaderComponent title='Все заявки' />
				{!isLoading && !data?.length && <EmptyText />}
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
				{!isLoading && !!data?.length && (
					<PaginationOrders
						page={page}
						setPage={setPage}
						count_pages={count_pages}
					/>
				)}
			</Container>
		</Box>
	)
}

export default Requests
