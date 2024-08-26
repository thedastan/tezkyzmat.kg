'use client'

import { Box, Flex } from '@chakra-ui/react'
import moment from 'moment'
import 'moment/locale/ru'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { SELLER_PAGES } from '@/config/pages-url.config'

import Description from '../../texts/Description'
import Moment from '../../texts/Moment'
import Title from '../../texts/Title'

import { EnumOrderStatus, IRequest } from '@/models/request.model'

interface ConfirmedCardSellerProps {
	request: IRequest
}
const ConfirmedCardSeller = ({
	request: { order, id, status, status_label }
}: ConfirmedCardSellerProps) => {
	const { push } = useRouter()

	const lastSeen = moment(order.created_at).fromNow()
	return (
		<Flex
			flexDirection='column'
			boxShadow='0px 1px 2px 0px #0000001F'
			rounded='14px'
			bg='#FFFFFF'
			px='5'
			py='6'
			mb='10px'
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
					color={
						order.status === EnumOrderStatus.IN_SEARCH ? '#1C1C1C' : '#06B217'
					}
					bg={
						order.status === EnumOrderStatus.IN_SEARCH ? '#F4F5F7' : '#EDFCEE'
					}
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
				<Title>{`${order.brand.brand}, ${order.model?.model} ${order.year?.year}, ${!!order.volume ? order.volume + 'L' : ''}`}</Title>
				{!!order.description && (
					<Description mt='12px'>{`“${order.description}”`}</Description>
				)}
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
	)
}

export default ConfirmedCardSeller
