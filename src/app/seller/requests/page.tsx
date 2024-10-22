import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Requests from './Requests'

export const metadata: Metadata = {
	title: 'Заявки',
	...NO_INDEX_PAGE
}

export default function SellerRequestsDetailPage() {
	return <Requests />
}
