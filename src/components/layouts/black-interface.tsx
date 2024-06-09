'use client'

import { Box, Container } from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useState } from 'react'

import { PROFILE_HEADER_HEIGHT } from '@/config/_variables.config'

import ProfileHeader from '../profile/header'

interface BlackInterfaceProps extends PropsWithChildren {}

const BlackInterface = ({ children }: BlackInterfaceProps) => {
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
		</Box>
	)
}

export default BlackInterface
