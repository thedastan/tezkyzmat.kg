import { ChakraProps, Heading } from '@chakra-ui/react'

interface Props extends ChakraProps {
	children: string
}
const TitleComponent = ({
	children,
	fontWeight = '700',
	fontSize = '30px',
	lineHeight = '39px',
	color = '#000000',
	textAlign = 'center',
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
			textAlign={textAlign}
		>
			{children}
		</Heading>
	)
}

export default TitleComponent
