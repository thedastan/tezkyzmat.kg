import { Box, ChakraProps, Flex, Text } from '@chakra-ui/react'
import { FiCopy } from 'react-icons/fi'

import { onCopyAddress } from '@/config/helpers'

interface CopyTextProps extends ChakraProps {
	value: string
}
const CopyText = ({
	value,
	color = '#1C1C1C',
	fontSize = '14px',
	...props
}: CopyTextProps) => {
	return (
		<Flex
			alignItems='center'
			justifyContent='space-between'
			gap='10px'
			fontWeight='500'
			lineHeight='16px'
			{...props}
		>
			<Text
				noOfLines={1}
				color={color}
				fontSize={fontSize}
			>
				{value}
			</Text>

			<Box
				onClick={() => onCopyAddress(value)}
				opacity='.5'
				fontSize='20px'
				cursor='pointer'
				_active={{ opacity: '.3' }}
			>
				<FiCopy color='#000000' />
			</Box>
		</Flex>
	)
}

export default CopyText
