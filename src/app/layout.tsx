import { Box, ChakraProvider } from '@chakra-ui/react'
import 'moment/locale/ru'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import PullToRefresh from '@/components/loader/PullToRefresh'

import { inter } from '@/constants/fonts'
import { SITE_NAME } from '@/constants/seo.constants'

import { INTERFACE_WIDTH } from '@/config/_variables.config'

import GoogleTagManager1 from './(seo)/GoogleTagManager1'
import GoogleTagManager2 from './(seo)/GoogleTagManager2'
import YandexMetrika from './(seo)/YandexMetrika'
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
			<Head />
			<body className={inter.className}>
				<GoogleTagManager2 />
				<GoogleTagManager1 />
				<ChakraProvider>
					<Providers>
						<>
							{/* <PullToRefresh /> */}
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

				<YandexMetrika />
			</body>
		</html>
	)
}
