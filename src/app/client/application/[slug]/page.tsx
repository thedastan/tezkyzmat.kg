import { Box, Container } from '@chakra-ui/react'
import { Metadata } from 'next'

import AddRequestButton from '@/components/add-request-button'
import HeaderComponent from '@/components/navbar/header-component'
import RequestCardClient from '@/components/ui/card/RequestCardClient'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Заявка',
	...NO_INDEX_PAGE
}

export default function ApplicationDetailPage() {
	return (
		<Box
			bg='#F4F5F7'
			minH='90vh'
		>
			<Container>
				<HeaderComponent title='Заявки' />
				<RequestCardClient is_detail={true} />
			</Container>
			<AddRequestButton />
		</Box>
	)
}
