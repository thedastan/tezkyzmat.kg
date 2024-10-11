'use client'

import { Box, Flex } from '@chakra-ui/react'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Card from '@/components/layouts/card'
import OrderTitles from '@/components/order-items/OrderTitles'

import { SELLER_PAGES } from '@/config/pages-url.config'

import IdNumber from '../../texts/IdNumber'
import Moment from '../../texts/Moment'

import {
	EnumOrderStatus,
	EnumSellerStatus,
	IRequest
} from '@/models/request.model'

interface ConfirmedCardSellerProps {
	request: IRequest
	status_label: string
}
const ConfirmedCardSeller = ({
	request: { order, id, seller_status },
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
						gap='4'
						alignItems='center'
					>
						<Flex
							py='1'
							px='6px'
							color={
								seller_status === EnumSellerStatus.COMPLETED
									? '#06B217'
									: '#1C1C1C'
							}
							bg={
								seller_status === EnumSellerStatus.COMPLETED
									? '#EDFCEE'
									: '#F4F5F7'
							}
							fontSize='10px'
							lineHeight='16px'
							letterSpacing='.5px'
							rounded='6px'
						>
							{status_label}
						</Flex>
						<IdNumber id={order.id} />
					</Flex>
				</Flex>
				<Box
					onClick={() => push(SELLER_PAGES.REQUEST_DETAIL(id))}
					cursor='pointer'
				>
					<OrderTitles
						order={order}
						phone={order.buyer_phone}
					/>
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
