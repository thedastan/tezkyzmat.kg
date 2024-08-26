import { Box, Divider, Flex } from '@chakra-ui/react'
import moment from 'moment'
import 'moment/locale/ru'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa6'

import Moment from '@/components/ui/texts/Moment'
import Title from '@/components/ui/texts/Title'

import { SELLER_PAGES } from '@/config/pages-url.config'

import RequestCardSellerButtons from './buttons'
import { IRequest } from '@/models/request.model'

interface RequestCardSellerProps {
	order: IRequest
}

const RequestCardSeller = ({
	order: { order, id, status, status_label }
}: RequestCardSellerProps) => {
	const lastSeen = moment(order.created_at).fromNow()
	return (
		<Box
			bg='#FFFFFF'
			rounded='14px'
			boxShadow='0px 1px 2px 0px #0000001F'
			px='5'
			py='6'
		>
			<Link href={SELLER_PAGES.REQUEST_DETAIL(order.id)}>
				<Flex
					justifyContent='space-between'
					alignItems='center'
				>
					<Moment>{lastSeen}</Moment>
					<FaChevronRight
						color='#000000'
						fontSize='14px'
					/>
				</Flex>
				<Title
					mt='4'
					noOfLines={1}
				>
					{`${order.brand.brand}, ${order.model?.model} ${order.year?.year}, ${!!order.volume ? order.volume + 'L' : ''} ${!!order.description && `“${order.description}”`}`}
				</Title>
			</Link>
			{!!order.order_images?.length && (
				<Flex
					overflowX='auto'
					mt='5'
					gap='10px'
					className='unscroll'
				>
					{order.order_images.map(el => (
						<Image
							key={el.id}
							src={el.image}
							alt='Image'
							width={50}
							height={50}
							style={{ borderRadius: '6px' }}
						/>
					))}
				</Flex>
			)}
			<Divider
				mt='14px'
				h='1px'
				bg='#000000'
				opacity='.1'
			/>
			<RequestCardSellerButtons id={id} />
		</Box>
	)
}

export default RequestCardSeller
