import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import RequestComponent from './RequestComponent'

export const metadata: Metadata = {
	title: 'Запрос',
	...NO_INDEX_PAGE
}
export default function RequestPage() {
	return <RequestComponent />
}
