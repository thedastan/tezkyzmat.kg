'use client'

import { Box, Container } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/navigation'

import Card from '@/components/layouts/card'
import HeaderComponent from '@/components/navbar/header-component'
import OrderTitles from '@/components/order/OrderTitles'
import OrderDetailData from '@/components/order/order-detail-data'
import RequestCardSellerButtons from '@/components/ui/card/RequestCardSeller/buttons'
import Moment from '@/components/ui/texts/Moment'
import Title from '@/components/ui/texts/Title'

import { useOrderDetail } from '@/hooks/useOrders'

import SliderDetail from './DetailSlider'
import { EnumOrderStatus } from '@/models/request.model'

const RequestsDetail = ({ id }: { id: string }) => {
	const { back } = useRouter()

	const { data, isLoading } = useOrderDetail(id)
	const lastSeen = moment(data?.order.created_at).fromNow()

	if (!data) return null
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
				{data.status === EnumOrderStatus.IN_SEARCH && (
					<Card py='5'>
						<Title
							textAlign='center'
							mb='5'
						>
							У вас есть эта запчасть?
						</Title>
						<RequestCardSellerButtons id={data.id} />
					</Card>
				)}

				<Card mt='10px'>
					<Moment>{lastSeen}</Moment>
					<Box mt='6'>
						<OrderTitles order={data.order} />
					</Box>

					<SliderDetail images={data.order.order_images} />

					<Box mt='14px'>
						<OrderDetailData order={data.order} />
					</Box>
				</Card>
			</Container>
		</Box>
	)
}

export default RequestsDetail
