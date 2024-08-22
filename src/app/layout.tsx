import { Box, ChakraProvider } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import PullToRefresh from '@/components/loader/PullToRefresh'

import { inter } from '@/constants/fonts'
import { SITE_NAME } from '@/constants/seo.constants'

import { INTERFACE_WIDTH } from '@/config/_variables.config'

import Head from './Head'
import { Providers } from './providers'
import '@/styles/globals.scss'

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Тез Кызмат | Запчасти | Доставка по КР'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Head />

				<ChakraProvider>
					<Providers>
						<>
							<PullToRefresh />
							<Box
								maxW={INTERFACE_WIDTH}
								mx='auto'
							>
								{children}
							</Box>
							<Toaster
								theme='dark'
								position='top-right'
								duration={2000}
							/>
						</>
					</Providers>
				</ChakraProvider>
			</body>
		</html>
	)
}
