import { Button, Flex } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'
import { LiaTimesSolid } from 'react-icons/lia'

const RequestCardSellerButtons = () => {
	return (
		<Flex
			mt='14px'
			gap='14px'
		>
			<Button
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
