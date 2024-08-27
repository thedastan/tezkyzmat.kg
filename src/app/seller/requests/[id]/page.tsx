import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import RequestsDetail from './RequestsDetail'

export const metadata: Metadata = {
	title: 'Заявка',
	...NO_INDEX_PAGE
}

export default function SellerRequestPage({
	params
}: {
	params: { id: string }
}) {
	return <RequestsDetail id={params.id} />
}
