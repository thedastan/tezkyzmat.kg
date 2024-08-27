'use client'

import { useEffect } from 'react'

const GoogleTagManager2 = () => {
	const gtmId = 'GTM-M7SXD8M3'
	useEffect(() => {
		// Check if script is already added
		if (
			!document.querySelector(
				`script[src="https://www.googletagmanager.com/gtm.js?id=${gtmId}"]`
			)
		) {
			;(function (w: any, d: Document, s: string, l: string, i: string) {
				w[l] = w[l] || []
				w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
				const f = d.getElementsByTagName(s)[0],
					j = d.createElement(s),
					dl = l != 'dataLayer' ? '&l=' + l : ''
				// @ts-ignore
				j.async = true
				// @ts-ignore
				j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
				f.parentNode!.insertBefore(j, f)
			})(window, document, 'script', 'dataLayer', gtmId)
		}

		return () => {
			// Optionally, clean up script if necessary
		}
	}, [])

	return (
		<>
			<noscript>
				<iframe
					src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
					height='0'
					width='0'
					style={{ display: 'none', visibility: 'hidden' }}
				></iframe>
			</noscript>
		</>
	)
}

export default GoogleTagManager2
