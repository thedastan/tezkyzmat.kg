import { ChakraProps, Text } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

const Moment: FC<PropsWithChildren<ChakraProps>> = ({ children, ...props }) => {
	return (
		<Text
			fontWeight='400'
			fontSize='12px'
			lineHeight='16px'
			letterSpacing='0.5px'
			color='#1C1C1C'
			opacity='.5'
			{...props}
		>
			{children}
		</Text>
	)
}

export default Moment
