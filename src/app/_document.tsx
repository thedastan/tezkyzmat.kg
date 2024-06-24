import Document, { Head, Html, Main, NextScript } from 'next/document'

import { inter } from '@/constants/fonts'

import GoogleTagManager2 from './(seo)/GoogleTagManager2'
import YandexMetrika from './(seo)/YandexMetrika'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* Скрипт Yandex Metrika */}

					<link
						rel='icon'
						href='/favicon.ico'
					/>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/apple-touch-icon.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/favicon-16x16.png'
					/>
					<link
						rel='manifest'
						href='/manifest.json'
					/>
					<meta
						name='theme-color'
						content='#ffffff'
					/>
					{/* yandex metrika  */}
					<YandexMetrika />

					<script
						async
						src='https://www.googletagmanager.com/gtag/js?id=G-H79YZMDZJR'
					></script>

					<GoogleTagManager2 />
					
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
					<Main />
					<NextScript />
					{/* Yandex Metrika noscript */}
					<noscript>
						<div>
							<img
								src='https://mc.yandex.ru/watch/97651883'
								style={{ position: 'absolute', left: '-9999px' }}
								alt=''
							/>
						</div>
					</noscript>
				</body>
			</Html>
		)
	}
}

export default MyDocument
