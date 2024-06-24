import Document, { Head, Html, Main, NextScript } from 'next/document'

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

					<script
						type='text/javascript'
						dangerouslySetInnerHTML={{
							__html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(97651883, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
                });
              `
						}}
					/>
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
				<body>
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
