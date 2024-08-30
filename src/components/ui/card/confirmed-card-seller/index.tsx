'use client'

import { Box, Flex } from '@chakra-ui/react'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Card from '@/components/layouts/card'
import OrderTitles from '@/components/order-items/OrderTitles'

import { SELLER_PAGES } from '@/config/pages-url.config'

import Moment from '../../texts/Moment'

import { EnumOrderStatus, IRequest } from '@/models/request.model'

interface ConfirmedCardSellerProps {
	request: IRequest
	status_label: string
}
const ConfirmedCardSeller = ({
	request: { order, id, status },
	status_label
}: ConfirmedCardSellerProps) => {
	const { push } = useRouter()

	const lastSeen = moment(order.created_at).fromNow()
	return (
		<Card mb='10px'>
			<Flex
				flexDirection='column'
				gap='5'
			>
				<Flex
					alignItems='center'
					justifyContent='space-between'
				>
					<Moment>{lastSeen}</Moment>

					<Flex
						py='1'
						px='6px'
						color={status === EnumOrderStatus.COMPLETED ? '#06B217' : '#1C1C1C'}
						bg={status === EnumOrderStatus.COMPLETED ? '#EDFCEE' : '#F4F5F7'}
						fontSize='10px'
						lineHeight='16px'
						letterSpacing='.5px'
						rounded='6px'
					>
						{status_label}
					</Flex>
				</Flex>
				<Box
					onClick={() => push(SELLER_PAGES.REQUEST_DETAIL(id))}
					cursor='pointer'
				>
					<OrderTitles order={order} />
				</Box>
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
			</Flex>
		</Card>
	)
}

export default ConfirmedCardSeller
