'use client'

import { Box, Container } from '@chakra-ui/react'

import AddRequestButton from '@/components/add-request-button'
import HeaderComponent from '@/components/navbar/header-component'
import RequestCardClient from '@/components/ui/card/RequestCardClient'

import { useRequestDetail } from '@/hooks/useRequest'

const ApplicationDetail = ({ param }: { param: string }) => {
	const { data, isLoading } = useRequestDetail(param)
	if (!data) return
	return (
		<Box
			bg='#F4F5F7'
			minH='90vh'
		>
			<Container>
				<HeaderComponent title='Заявка' />
				<RequestCardClient
					request={data}
					is_detail={true}
				/>
			</Container>
			<AddRequestButton />
		</Box>
	)
}

export default ApplicationDetail
