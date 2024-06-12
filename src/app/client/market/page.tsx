import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.contants'

import MarkerComponent from './MarkerComponent'

export const metadata: Metadata = {
	title: 'Маркет',
	...NO_INDEX_PAGE
}
export default function MarketPage() {
	return <MarkerComponent />
}
