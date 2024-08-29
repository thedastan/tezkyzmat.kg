import { Box, Divider, Flex } from '@chakra-ui/react'
import moment from 'moment'
import 'moment/locale/ru'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa6'

import Card from '@/components/layouts/card'
import OrderTitles from '@/components/order-items/OrderTitles'
import Moment from '@/components/ui/texts/Moment'

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
		<Card>
			<Link href={SELLER_PAGES.REQUEST_DETAIL(id)}>
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
				<Box mt='4'>
					<OrderTitles order={order} />
				</Box>
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
		</Card>
	)
}

export default RequestCardSeller
