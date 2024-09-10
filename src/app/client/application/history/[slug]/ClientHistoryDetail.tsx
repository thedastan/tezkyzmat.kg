'use client'

import { Box, Button, Container, Spinner } from '@chakra-ui/react'

import Card from '@/components/layouts/card'
import HeaderComponent from '@/components/navbar/header-component'
import CompletedCardClient from '@/components/ui/card/completed-card-client'
import Description from '@/components/ui/texts/Description'

import { useCompletedRequestDetail } from '@/hooks/useRequest'

const ClientHistoryDetail = ({ slug }: { slug: string }) => {
	const { data, isLoading } = useCompletedRequestDetail(slug)

	if (!data) return null
	return (
		<Box pb='30px'>
			{isLoading && <Spinner />}
			<Container>
				<HeaderComponent title='Оформленные заказы' />

				<CompletedCardClient
					order={data}
					is_detail={true}
				/>

				<Card
					textAlign='center'
					mt='10px'
				>
					<Description
						fontSize='14px'
						lineHeight='17.5px'
						opacity='.5'
						maxW='90%'
						mx='auto'
					>
						В течение 3х дней можно сделать возврат заказа
					</Description>

					<Button
						mt='19px'
						w='100%'
						h='46px'
						bg='#F4F5F7'
						rounded='10px'
						fontWeight='600'
						fontSize='16px'
						lineHeight='20px'
						color='#1C1C1C'
					>
						Возврат заказа
					</Button>
				</Card>
			</Container>
		</Box>
	)
}

export default ClientHistoryDetail
