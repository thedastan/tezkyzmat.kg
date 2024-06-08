import { Button, ChakraProps } from '@chakra-ui/react'

interface DefButtonProps extends ChakraProps {
	children: string
	onClick?: () => void
	type?: 'button' | 'submit'
	disabled?: boolean
	rounded?: string
	isTransparent?: boolean
}
const DefButton = ({
	onClick,
	type = 'button',
	isTransparent = false,
	disabled,
	children,
	...props
}: DefButtonProps) => {
	return (
		<Button
			onClick={onClick}
			type={type}
			variant='none'
			w='100%'
			bg={isTransparent ? 'transparent' : '#1C1C1C'}
			border={isTransparent ? `2px solid #FFFFFF` : 'none'}
			h='56px'
			rounded='14px'
			color={isTransparent ? '#1C1C1C' : '#FFFFFF'}
			fontSize='16px'
			fontWeight='600'
			isDisabled={disabled}
			px='2'
			lineHeight='20px'
			{...props}
		>
			{children}
		</Button>
	)
}

export default DefButton
