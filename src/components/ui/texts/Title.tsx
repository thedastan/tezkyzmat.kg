import { ChakraProps, Heading } from '@chakra-ui/react'

interface Props extends ChakraProps {
	children: string
}
const Title = ({
	children,
	fontWeight = '700',
	fontSize = '16px',
	lineHeight = '16px',
	color = '#1C1C1C',
	...props
}: Props) => {
	return (
		<Heading
			as='h1'
			{...props}
			color={color}
			fontWeight={fontWeight}
			lineHeight={lineHeight}
			fontSize={fontSize}
			letterSpacing='0.5px'
		>
			{children}
		</Heading>
	)
}

export default Title
