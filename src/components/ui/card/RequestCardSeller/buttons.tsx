import { Button, Flex } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'
import { LiaTimesSolid } from 'react-icons/lia'

import Spinner from '@/components/loader/spinner'

import { useOrderChangeStatus } from '@/hooks/useOrders'

import { EnumOrderStatus } from '@/models/request.model'

const RequestCardSellerButtons = ({ id }: { id: number }) => {
	const { isPending, mutate } = useOrderChangeStatus()
	return (
		<Flex
			mt='14px'
			gap='14px'
		>
			{isPending && <Spinner />}
			<Button
				onClick={() => mutate({ id, status: EnumOrderStatus.NO })}
				variant='none'
				rounded='10px'
				h='48px'
				bg='#F4F5F7'
				gap='4'
				w='50%'
				color='#1C1C1C'
				fontSize='16px'
				lineHeight='20px'
				fontWeight='600'
			>
				<LiaTimesSolid />
				Нет
			</Button>
			<Button
				onClick={() => mutate({ id, status: EnumOrderStatus.YES })}
				variant='none'
				rounded='10px'
				h='48px'
				bg='#F4F5F7'
				gap='4'
				w='50%'
				color='#1C1C1C'
				fontSize='16px'
				lineHeight='20px'
				fontWeight='600'
			>
				<FaCheck />
				Есть
			</Button>
		</Flex>
	)
}

export default RequestCardSellerButtons