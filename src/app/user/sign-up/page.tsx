import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { EnumRole } from '@/config/role'

import SignUp from './(components)/SignUp'

export const metadata: Metadata = {
	title: 'Регистрация - Покупатель',
	...NO_INDEX_PAGE
}

export default function ClientRegisterPage() {
	return <SignUp role={EnumRole.CLIENT} />
}
