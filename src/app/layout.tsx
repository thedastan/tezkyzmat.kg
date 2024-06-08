import { ChakraProvider } from '@chakra-ui/react'
import type { Metadata } from 'next'

import { inter } from '@/constants/fonts'
import { SITE_NAME } from '@/constants/seo.contants'

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
				<ChakraProvider>
					<Providers>{children}</Providers>
				</ChakraProvider>
			</body>
		</html>
	)
}
