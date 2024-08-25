'use client'

import { Box, Container, Flex } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'

import {
	INTERFACE_WIDTH,
	NAVBAR_HEIGHT,
	PROFILE_HEADER_HEIGHT,
	SELLER_PROFILE_HEADER_HEIGHT
} from '@/config/_variables.config'
import { LOGISTICIAN_PAGES, SELLER_PAGES } from '@/config/pages-url.config'

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
	const pathname = usePathname()

	const isSellerPage = pathname === SELLER_PAGES.HOME
	const isLogisticianPage = pathname === LOGISTICIAN_PAGES.MAIN
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
				bg={isSellerPage || isLogisticianPage ? '#F4F5F7' : '#FFFFFF'}
				borderTopRadius='30px'
				position='relative'
				zIndex='1'
				minH={innerHeight - 80 + 'px'}
				h='100%'
			>
				<Container>{children}</Container>
			</Box>
			{!!buttonText && (
				<Flex
					position='fixed'
					zIndex='20'
					bottom={
						(isSellerPage || isLogisticianPage ? 0 : parseInt(NAVBAR_HEIGHT)) +
						20 +
						'px'
					}
					left='0'
					right='0'
				>
					<Container maxW={INTERFACE_WIDTH}>
						<DefButton onClick={buttonFn}>{buttonText}</DefButton>
					</Container>
				</Flex>
			)}
		</Box>
	)
}

export default BlackInterface
