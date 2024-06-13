import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ApplicationComponent from './ApplicationComponent'

export const metadata: Metadata = {
	title: 'Заявки',
	...NO_INDEX_PAGE
}

export default function ApplicationPage() {
	return <ApplicationComponent />
}
