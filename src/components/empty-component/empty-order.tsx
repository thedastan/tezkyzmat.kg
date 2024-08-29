import { Flex } from '@chakra-ui/react'
import Image from 'next/image'

import EmptySvg from '@/assets/img/empty-seller-order.svg'

import Description from '../ui/texts/Description'

export default function EmptyOrder() {
	return (
		<Flex
			flexDirection='column'
			alignItems='center'
			textAlign='center'
			gap='33px'
			h='100%'
			justifyContent='center'
			mt='60px'
		>
			<Image
				src={EmptySvg}
				alt='empty'
			/>
			<Description maxW='294px'>
				Заявок пока нет, но это временно. Мы уведомим вас о новых запросах.
			</Description>
		</Flex>
	)
}
