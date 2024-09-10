'use client'

import { Box, Container, Spinner, Stack } from '@chakra-ui/react'

import HeaderComponent from '@/components/navbar/header-component'
import CompletedCardClient from '@/components/ui/card/completed-card-client'
import EmptyText from '@/components/ui/texts/EmptyText'

import { useCompletedRequest } from '@/hooks/useRequest'

const ClientHistory = () => {
	const { data, isLoading } = useCompletedRequest()

	return (
		<Box>
			{isLoading && <Spinner />}
			<Container>
				<HeaderComponent title='История' />

				{!data?.length && <EmptyText />}
				<Stack>
					{data?.map(el => (
						<CompletedCardClient
							key={el.id}
							order={el}
						/>
					))}
				</Stack>
			</Container>
		</Box>
	)
}

export default ClientHistory
