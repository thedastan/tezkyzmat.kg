import { Flex } from '@chakra-ui/react'
import Link from 'next/link'

import Description from '../ui/texts/Description'
import Title from '../ui/texts/Title'

import { ILogistOrder } from '@/models/logist.model'
import { ICompletedOrder, IOrder } from '@/models/request.model'

const OrderTitles = ({
	order,
	phone
}: {
	order: IOrder | ILogistOrder | ICompletedOrder
	phone?: string
}) => {
	return (
		<>
			<Title>{`${order.brand.brand}, ${order.model?.model} ${order.year?.year}, ${!!order.volume ? order.volume.name + 'L' : ''}`}</Title>
			{!!order.description && (
				<Description mt='12px'>{`“${order.description}”`}</Description>
			)}
			{!!phone && (
				<Flex
					justifyContent='start'
					mt='3'
					fontSize='16px'
					color='#355BE6'
					textDecoration='underline'
				>
					<Link href={`tel:${phone}`}>{phone}</Link>
				</Flex>
			)}
		</>
	)
}

export default OrderTitles
