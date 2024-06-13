import { ChakraProvider } from '@chakra-ui/react'
import type { Metadata } from 'next'
import Head from 'next/head'
import { Toaster } from 'sonner'

import { inter } from '@/constants/fonts'
import { SITE_NAME } from '@/constants/seo.constants'

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
			<Head>
				<meta
					name='theme-color'
					content='#000000'
				/>

				{/* <!-- Windows Phone --> */}
				<meta
					name='msapplication-navbutton-color'
					content='#000000'
				/>

				{/* <!-- iOS Safari --> */}
				<meta
					name='apple-mobile-web-app-capable'
					content='yes'
				/>
				<meta
					name='apple-mobile-web-app-status-bar-style'
					content='black-transcluent'
				/>
			</Head>
			<body className={inter.className}>
				<ChakraProvider>
					<Providers>
						<>
							{children}
							<Toaster
								theme='dark'
								position='bottom-right'
								duration={2000}
							/>
						</>
					</Providers>
				</ChakraProvider>
			</body>
		</html>
	)
}
