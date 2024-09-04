'use client'

import { Box, Container, Spinner, Stack } from '@chakra-ui/react'

import HeaderComponent from '@/components/navbar/header-component'
import RequestCardClient from '@/components/ui/card/RequestCardClient'
import EmptyText from '@/components/ui/texts/EmptyText'

import { useRequest } from '@/hooks/useRequest'

import { EnumOrderStatus } from '@/models/request.model'

const ClientHistory = () => {
	const { data, isLoading } = useRequest()

	const history = data?.filter(el => el.status === EnumOrderStatus.COMPLETED)
	return (
		<Box>
			{isLoading && <Spinner />}
			<Container>
				<HeaderComponent title='История' />

				{!history?.length && <EmptyText />}
				<Stack>
					{history?.map(el => (
						<RequestCardClient
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
