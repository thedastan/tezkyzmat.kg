import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.contants'

export const metadata: Metadata = {
	title: 'Продавец',
	...NO_INDEX_PAGE
}

export default function SellerPage() {
	return <div>Seller Page</div>
}
