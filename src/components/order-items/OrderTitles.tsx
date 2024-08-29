import Description from '../ui/texts/Description'
import Title from '../ui/texts/Title'

import { ILogistOrder } from '@/models/logist.model'
import { IOrder } from '@/models/request.model'

const OrderTitles = ({ order }: { order: IOrder | ILogistOrder }) => {
	return (
		<>
			<Title>{`${order.brand.brand}, ${order.model?.model} ${order.year?.year}, ${!!order.volume ? order.volume + 'L' : ''}`}</Title>
			{!!order.description && (
				<Description mt='12px'>{`“${order.description}”`}</Description>
			)}
		</>
	)
}

export default OrderTitles
