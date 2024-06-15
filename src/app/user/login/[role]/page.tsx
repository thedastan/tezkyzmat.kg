import { Metadata } from 'next'
import { useEffect } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Login from './(components)/Login'

export const metadata: Metadata = {
	title: 'Авторизация',
	...NO_INDEX_PAGE
}

export default function LoginPage() {
	return <Login />
}
