import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Продавец',
	...NO_INDEX_PAGE
}

export default function SellerPage() {
	return <div>Seller Page</div>
}
