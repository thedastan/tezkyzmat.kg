import { Container, Flex } from '@chakra-ui/react'
import { BsPlusLg } from 'react-icons/bs'

import { INTERFACE_WIDTH, NAVBAR_HEIGHT } from '@/config/_variables.config'

const AddRequestButton = () => {
	return (
		<Flex
			position='fixed'
			bottom={NAVBAR_HEIGHT}
			pb='11px'
			left='0'
			right='0'
		>
			<Container maxW={INTERFACE_WIDTH}>
				<Flex
					justifyContent='center'
					alignItems='center'
					w='50px'
					h='50px'
					rounded='50%'
					bg='#F9BD15'
					_active={{ opacity: '.7' }}
					mx='auto'
					cursor='pointer'
				>
					<BsPlusLg
						color='#FFFFFF'
						fontSize='30px'
					/>
				</Flex>
			</Container>
		</Flex>
	)
}

export default AddRequestButton
