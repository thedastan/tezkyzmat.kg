'use client'

import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
	INTERFACE_PADDING,
	INTERFACE_WIDTH,
	NAVBAR_HEIGHT
} from '@/config/_variables.config'

import { client_navbar } from './data'

const ClientNavbar = () => {
	const pathname = usePathname()
	return (
		<Flex
			position='fixed'
			zIndex='20'
			bottom='0'
			left='0'
			right='0'
		>
			<Box
				mx='auto'
				w={INTERFACE_WIDTH}
				h={NAVBAR_HEIGHT}
				bg={'#FFFFFF'}
				borderTop='1px solid #F4F5F7'
			>
				<SimpleGrid
					columns={client_navbar.length}
					className='navbar'
					h={'100%'}
					pt='3'
					pb='10px'
				>
					{client_navbar.map((nav, idx) => (
						<Link
							href={nav.path}
							key={idx}
						>
							<Flex
								flexDirection='column'
								justifyContent='space-between'
								alignItems='center'
								h='100%'
								gap='1'
								opacity={pathname.includes(nav.path) ? '1' : '.3'}
							>
								<Flex
									h={'32px'}
									w='64px'
									rounded='16px'
									justifyContent='center'
									alignItems='center'
									bg={pathname.includes(nav.path) ? '#F9BD1529' : 'transparent'}
								>
									<nav.svg
										theme={pathname.includes(nav.path) ? '#F9BD15' : '#292D32'}
									/>
								</Flex>
								<Text
									color='#1C1C1C'
									letterSpacing='0.5px'
									fontWeight='500'
									fontSize='12px'
									lineHeight='16px'
								>
									{nav.name}
								</Text>
							</Flex>
						</Link>
					))}
				</SimpleGrid>
			</Box>
		</Flex>
	)
}

export default ClientNavbar
