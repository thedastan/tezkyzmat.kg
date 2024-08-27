import { Box, ChakraProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface CardProps extends ChakraProps, PropsWithChildren {}

const Card = ({ children, py = '6', ...props }: CardProps) => {
	return (
		<Box
			bg='#FFFFFF'
			rounded='14px'
			boxShadow='0px 1px 2px 0px #0000001F'
			px='5'
			py={py}
			{...props}
		>
			{children}
		</Box>
	)
}

export default Card
