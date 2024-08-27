'use client'

import { useEffect } from 'react'

const YandexMetrika = () => {
	useEffect(() => {
		const metrikaId = '97651883'

		// Check if script is already added
		if (
			!document.querySelector(
				`script[src="https://mc.yandex.ru/metrika/tag.js"]`
			)
		) {
			// @ts-ignore
			;(function (
				m: any,
				e: any,
				t: string,
				r: string,
				i: string,
				k: any,
				a: any
			) {
				m[i] =
					m[i] ||
					function () {
						;(m[i].a = m[i].a || []).push(arguments)
					}
				// @ts-ignore
				m[i].l = 1 * new Date()
				k = e.createElement(t)
				a = e.getElementsByTagName(t)[0]
				k.async = 1
				k.src = r
				a.parentNode.insertBefore(k, a)
			})(
				window,
				document,
				'script',
				'https://mc.yandex.ru/metrika/tag.js',
				'ym'
			)

			// Initialize Yandex Metrika
			;(window as any).ym(metrikaId, 'init', {
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
				webvisor: true
			})
		}

		return () => {
			// Optionally, clean up script if necessary
		}
	}, [])

	return (
		<>
			<noscript>
				<div>
					<img
						src={`https://mc.yandex.ru/watch/${97651883}`}
						style={{ position: 'absolute', left: '-9999px' }}
						alt=''
					/>
				</div>
			</noscript>
		</>
	)
}

export default YandexMetrika
