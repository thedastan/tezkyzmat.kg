'use client'

import { Box, Container, Flex } from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useState } from 'react'

import {
	INTERFACE_WIDTH,
	NAVBAR_HEIGHT,
	PROFILE_HEADER_HEIGHT
} from '@/config/_variables.config'

import ProfileHeader from '../profile/header'
import DefButton from '../ui/buttons/DefButton'

interface BlackInterfaceProps extends PropsWithChildren {
	buttonText?: string
	buttonFn?: () => void
}

const BlackInterface = ({
	children,
	buttonFn,
	buttonText
}: BlackInterfaceProps) => {
	const [innerHeight, setHeight] = useState(0)

	useEffect(() => {
		setHeight(document.documentElement.clientHeight - 150)
	}, [])
	return (
		<Box pt={PROFILE_HEADER_HEIGHT}>
			<ProfileHeader />
			<Box
				w='100%'
				pt='30px'
				pb='20px'
				bg='#FFFFFF'
				borderTopRadius='30px'
				position='relative'
				zIndex='1'
			>
				<Container
					minH={innerHeight + 'px'}
					h='100%'
				>
					{children}
				</Container>
			</Box>
			{!!buttonText && (
				<Flex
					position='fixed'
					zIndex='20'
					bottom={parseInt(NAVBAR_HEIGHT) + 20 + 'px'}
					left='0'
					right='0'
				>
					<Container maxW={INTERFACE_WIDTH}>
						<DefButton>{buttonText}</DefButton>
					</Container>
				</Flex>
			)}
		</Box>
	)
}

export default BlackInterface
