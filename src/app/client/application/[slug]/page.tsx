import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ApplicationDetail from './ApplicationDetail'

export const metadata: Metadata = {
	title: 'Заявка',
	...NO_INDEX_PAGE
}

export default function ApplicationDetailPage({
	params
}: {
	params: { slug: string }
}) {
	return <ApplicationDetail param={params.slug} />
}
