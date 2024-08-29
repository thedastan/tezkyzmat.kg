'use client'

import { Box, Container } from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useState } from 'react'

import {
	NAVBAR_HEIGHT,
	PROFILE_HEADER_HEIGHT,
	SELLER_PROFILE_HEADER_HEIGHT
} from '@/config/_variables.config'
import { EnumRole, RoleTypes } from '@/config/role'

import ProfileHeader from '../profile/header'
import FixButton from '../ui/buttons/FixButton'

interface BlackInterfaceProps extends PropsWithChildren {
	buttonText?: string
	buttonFn?: () => void
	role: RoleTypes
}

const BlackInterface = ({
	children,
	buttonFn,
	buttonText,
	role
}: BlackInterfaceProps) => {
	const [innerHeight, setHeight] = useState(0)
	const isSellerPage = role === EnumRole.SELLER
	const isClientPage = role === EnumRole.CLIENT
	useEffect(() => {
		setHeight(document.documentElement.clientHeight - 150)
	}, [])
	return (
		<Box
			pt={isSellerPage ? SELLER_PROFILE_HEADER_HEIGHT : PROFILE_HEADER_HEIGHT}
		>
			<ProfileHeader />
			<Box
				w='100%'
				pt='30px'
				pb='20px'
				bg={isClientPage ? '#FFFFFF' : '#F4F5F7'}
				borderTopRadius='30px'
				position='relative'
				zIndex='1'
				minH={innerHeight - 80 + 'px'}
				h='100%'
			>
				<Container h='100%'>{children}</Container>
			</Box>
			{!!buttonText && (
				<FixButton
					onClick={buttonFn}
					bottom={(!isClientPage ? 0 : parseInt(NAVBAR_HEIGHT)) + 20 + 'px'}
				>
					{buttonText}
				</FixButton>
			)}
		</Box>
	)
}

export default BlackInterface
