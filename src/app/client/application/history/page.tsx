import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ClientHistory from './ClientHistory'

export const metadata: Metadata = {
	title: 'История',
	...NO_INDEX_PAGE
}

export default function ClientHistoryPage() {
	return <ClientHistory />
}
