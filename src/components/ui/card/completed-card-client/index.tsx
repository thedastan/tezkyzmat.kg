import { Box, Divider, Flex } from '@chakra-ui/react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Card from '@/components/layouts/card'
import OrderTitles from '@/components/order-items/OrderTitles'
import OrderDetailData from '@/components/order-items/order-detail-data'

import { CLIENT_PAGES } from '@/config/pages-url.config'

import Moment from '../../texts/Moment'
import Title from '../../texts/Title'

import { IOrderInLogist } from '@/models/logist.model'
import { ICompletedOrder } from '@/models/request.model'

interface RequestCardClientProps {
	order: ICompletedOrder
	is_detail?: boolean
}
const CompletedCardClient = ({ order, is_detail }: RequestCardClientProps) => {
	const lastSeen = moment(order.created_at).fromNow()
	const { push } = useRouter()
	return (
		<Card
			display='flex'
			flexDirection='column'
			mb='10px'
		>
			<Box
				display='flex'
				flexDirection='column'
				gap='5'
				mt='2'
				cursor='pointer'
				onClick={() =>
					!is_detail ? push(CLIENT_PAGES.HISTORY_DETAIL(order.id)) : {}
				}
			>
				<Flex
					alignItems='center'
					justifyContent='space-between'
				>
					<Moment>{lastSeen}</Moment>

					<Box
						bg='#F4F5F7'
						padding='1'
						fontSize='10px'
						color='#1C1C1C'
						rounded='6px'
					>
						№ {order.id}
					</Box>
				</Flex>
				<OrderTitles order={order} />
				<Flex
					gap='10px'
					overflowX='auto'
					className='unscroll'
				>
					{order.order_images?.map(el => (
						<Image
							key={el.id}
							src={el.image}
							alt='Image'
							width={50}
							height={50}
							objectFit='cover'
							style={{ borderRadius: '6px' }}
						/>
					))}
				</Flex>
				{<OrderDetailData order={order} />}
			</Box>
			{order.order_sellers?.map(courier => <CourierData courier={courier} />)}
		</Card>
	)
}

interface SellerWhatsappCardProps {
	courier: IOrderInLogist
}

function CourierData({ courier }: SellerWhatsappCardProps) {
	const Call_link = `tel:${courier.courier_phone}`

	return (
		<Box
			justifyContent='space-between'
			alignItems='center'
		>
			<Divider
				my='5'
				h='1px'
				bg='#000000'
				opacity='.1'
			/>
			<Flex
				justifyContent='space-between'
				alignItems='start'
				gap='1'
			>
				<Box>
					<Title fontWeight='500'>{courier.courier_name}</Title>
					<Link href={Call_link}>
						<Title
							fontWeight='500'
							opacity='.5'
							mt='3'
						>
							{courier.courier_phone}
						</Title>
					</Link>
				</Box>

				<Box
					bg='#F4F5F7'
					px='6px'
					py='1'
					rounded='6px'
					fontSize='10px'
					lineHeight='16px'
					letterSpacing='0.5px'
					color='#1C1C1C'
					fontWeight='400'
				>
					Курьер
				</Box>
			</Flex>

			{courier.courier_payment && (
				<Flex
					mt='5'
					alignItems='center'
					justifyContent='space-between'
					gap='1'
				>
					<Moment>Доставка:</Moment>
					<Flex gap='1'>
						<Title>{courier.courier_payment}</Title>
						<Title textDecoration='underline'>c</Title>
					</Flex>
				</Flex>
			)}

			<Flex
				mt='5'
				alignItems='center'
				justifyContent='space-between'
				gap='1'
			>
				<Moment>Статус:</Moment>
				<Title color='#06B217'>
					{courier.is_sent
						? 'Товар отправлен вам'
						: courier.is_taken
							? 'У курьера'
							: 'Курьер скоро получит товар'}
				</Title>
			</Flex>
		</Box>
	)
}

export default CompletedCardClient
