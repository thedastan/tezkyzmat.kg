import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Seller from './Seller'

export const metadata: Metadata = {
	title: 'Продавец',
	...NO_INDEX_PAGE
}

export default function SellerPage() {
	return <Seller />
}
