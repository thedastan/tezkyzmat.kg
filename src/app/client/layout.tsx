import { Box, Container } from '@chakra-ui/react'

import ClientNavbar from '@/components/navbar/client-navbar'

import { NAVBAR_HEIGHT } from '@/config/_variables.config'

export default function ClientLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Box
			minH='100vh'
			bg='#F4F5F7'
			pb={NAVBAR_HEIGHT}
		>
			{children}
			<ClientNavbar />
		</Box>
	)
}
