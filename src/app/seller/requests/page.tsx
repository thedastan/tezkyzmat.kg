import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Заявки',
	...NO_INDEX_PAGE
}

export default function SellerRequestsPage() {
	return <div>Страница в разработке...</div>
}
