import { Flex, Stack } from '@chakra-ui/react'

import Moment from '../ui/texts/Moment'
import Title from '../ui/texts/Title'

import { ICompletedOrder, IOrder } from '@/models/request.model'
import { condition_order } from '@/models/value-interfaces/request.values'

const OrderDetailData = ({ order }: { order: IOrder | ICompletedOrder }) => {
	return (
		<Stack spacing='14px'>
			<Flex
				alignItems='center'
				gap='1'
			>
				<Moment>Производство: </Moment>
				<Title fontWeight='600'>
					{order.country ? order.country.name : '-'}
				</Title>
			</Flex>
			<Flex
				alignItems='center'
				gap='1'
			>
				<Moment>Тип кузова:</Moment>
				<Title fontWeight='600'>{order.body ? order.body.name : '-'}</Title>
			</Flex>
			<Flex
				alignItems='center'
				gap='1'
			>
				<Moment>Б/У или новый:</Moment>
				<Title fontWeight='600'>
					{!!order.condition && !!condition_order[order.condition]
						? condition_order[order.condition]
						: '-'}
				</Title>
			</Flex>
			<Flex
				alignItems='center'
				gap='1'
			>
				<Moment>Vin-код:</Moment>
				<Title fontWeight='600'>{order.VIN ? order.VIN : '-'}</Title>
			</Flex>
		</Stack>
	)
}

export default OrderDetailData
