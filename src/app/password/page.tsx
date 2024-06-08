import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.contants'

import ResetPassword from './(components)/ResetPassword'

export const metadata: Metadata = {
	title: 'Пароль',
	...NO_INDEX_PAGE
}
export default function PasswordPage() {
	return <ResetPassword />
}
