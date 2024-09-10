import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ClientHistoryDetail from './ClientHistoryDetail'

export const metadata: Metadata = {
	title: 'Оформленные заказы',
	...NO_INDEX_PAGE
}

export default function ClientHistoryDetailPage({
	params
}: {
	params: { slug: string }
}) {
	return <ClientHistoryDetail slug={params.slug} />
}
