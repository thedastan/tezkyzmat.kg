import { Box, ChakraProps, Flex, Text } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { FiCopy } from 'react-icons/fi'

interface CopyTextProps extends ChakraProps, PropsWithChildren {}
const CopyText = ({
	children,
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
				{children}
			</Text>

			<Box
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
