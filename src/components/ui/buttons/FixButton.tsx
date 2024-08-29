import { Container, Flex } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { INTERFACE_WIDTH } from '@/config/_variables.config'

import DefButton from './DefButton'

interface FixedButtonProps extends PropsWithChildren {
	onClick?: () => void
	bg?: string
	bottom?: string
	type?: 'button' | 'submit'
}
const FixButton = ({
	onClick,
	children,
	bg,
	bottom = '20px',
	type
}: FixedButtonProps) => {
	return (
		<Flex
			position='fixed'
			w='100%'
			bottom={bottom}
			left='0'
			right='0'
			zIndex='20'
		>
			<Container maxW={INTERFACE_WIDTH}>
				<DefButton
					onClick={onClick}
					bg={bg}
					type={type}
				>
					{children}
				</DefButton>
			</Container>
		</Flex>
	)
}

export default FixButton
