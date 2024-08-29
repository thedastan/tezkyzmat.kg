import { Button, ChakraProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface DefButtonProps extends ChakraProps, PropsWithChildren {
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
	bg = '#1C1C1C',
	...props
}: DefButtonProps) => {
	return (
		<Button
			onClick={onClick}
			type={type}
			variant='none'
			w='100%'
			bg={isTransparent ? 'transparent' : bg}
			border={isTransparent ? `2px solid #1C1C1C` : 'none'}
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
