import { Box, Divider, Flex } from '@chakra-ui/react'
import moment from 'moment'

import OrderTitles from '@/components/order-items/OrderTitles'
import CopyText from '@/components/ui/texts/CopyText'
import Moment from '@/components/ui/texts/Moment'
import Title from '@/components/ui/texts/Title'

import SentButton from './SentButton'
import TakeButton from './TakeButton'
import { ILogistItem } from '@/models/logist.model'

const LogistCard = ({ el }: { el: ILogistItem }) => {
	const lastSeen = moment(el.created_at).fromNow()
	return (
		<Box
			bg='#FFFFFF'
			boxShadow='0px 1px 2px 0px #0000001F'
			rounded='14px'
			px='5'
			py='6'
		>
			<Moment>{lastSeen}</Moment>
			<Flex
				mt='5'
				justifyContent='space-between'
				alignItems='start'
				gap='3'
			>
				<Box>
					<Title fontWeight='500'>{el.seller.full_name}</Title>
					<Title
						mt='3'
						fontWeight='500'
						opacity='.5'
					>
						{el.seller.phone}
					</Title>
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
				>
					Продавец
				</Box>
			</Flex>
			<CopyText
				mt='4'
				color='#477CF0'
				fontSize='16px'
				value={`${el.seller.market}, ${el.seller.shop}, ${el.seller.address}`}
			/>

			<Divider
				h='1px'
				bg='#000000'
				opacity='.1'
				my='5'
			/>

			<Flex
				mt='5'
				justifyContent='space-between'
				alignItems='start'
				gap='3'
			>
				<Box>
					<Title fontWeight='500'>{el.order.buyer.full_name}</Title>
					<Title
						mt='3'
						fontWeight='500'
						opacity='.5'
					>
						{el.order.buyer.phone}
					</Title>
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
				>
					Клиент
				</Box>
			</Flex>
			<CopyText
				mt='4'
				color='#477CF0'
				fontSize='16px'
				value={`${el.order.region}, ${el.order.district}, ${el.order.street}`}
			/>

			<Divider
				h='1px'
				bg='#000000'
				opacity='.1'
				my='5'
			/>
			<OrderTitles order={el.order} />

			<Flex
				gap='14px'
				mt='5'
			>
				{!el.is_sent && <TakeButton el={el} />}
				<SentButton el={el} />
			</Flex>
		</Box>
	)
}

export default LogistCard
