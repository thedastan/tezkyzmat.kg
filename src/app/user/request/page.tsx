import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import RequestComponent from '@/app/client/request/RequestComponent'

export const metadata: Metadata = {
	title: 'Заявка',
	...NO_INDEX_PAGE
}

export default function UserRequestPage() {
	return <RequestComponent />
}
