import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Подтверждённые заявки',
	...NO_INDEX_PAGE
}

export default function ConfirmedPage() {
	return <div>Страница в разработке...</div>
}
