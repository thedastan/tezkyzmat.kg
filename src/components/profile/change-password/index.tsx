import { Flex, Text } from '@chakra-ui/react'
import { RiLockPasswordFill } from 'react-icons/ri'

const ChangePassword = () => {
	return (
		<Flex
			alignItems='center'
			bg='#F4F5F7'
			px='4'
			py='17px'
			gap='3'
			rounded='14px'
			cursor='pointer'
			h='58px'
		>
			<RiLockPasswordFill
				color='#292D32'
				fontSize='22px'
			/>
			<Text color='#1C1C1C'>Изменить пароль</Text>
		</Flex>
	)
}

export default ChangePassword
