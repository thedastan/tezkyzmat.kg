import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.contants'

import Login from './(components)/Login'

export const metadata: Metadata = {
	title: 'Авторизация',
	...NO_INDEX_PAGE
}

export default function LoginPage() {
	return <Login />
}
