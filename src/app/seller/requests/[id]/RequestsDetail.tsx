'use client'

import { Box, Container } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import HeaderComponent from '@/components/navbar/header-component'
import RequestCardSellerButtons from '@/components/ui/card/RequestCardSeller/buttons'
import Title from '@/components/ui/texts/Title'

import { useOrderDetail } from '@/hooks/useOrders'

const RequestsDetail = ({ slug }: { slug: string }) => {
	const { back } = useRouter()

	const { data, isLoading } = useOrderDetail(slug)
	return (
		<Box
			bg='#F4F5F7'
			minH='100vh'
		>
			<Container>
				<HeaderComponent
					title='Заявка'
					backFn={back}
				/>
				<Box
					bg='#FFFFFF'
					rounded='14px'
					boxShadow='0px 1px 2px 0px #0000001F'
					px='19.5px'
					py='5'
				>
					<Title
						textAlign='center'
						mb='5'
					>
						У вас есть эта запчасть?
					</Title>
					<RequestCardSellerButtons id={1} />
				</Box>
			</Container>
		</Box>
	)
}

export default RequestsDetail
