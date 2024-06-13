import { Box } from '@chakra-ui/react'
import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import SignUp from './(components)/SignUp'

export const metadata: Metadata = {
	title: 'Регистрация',
	...NO_INDEX_PAGE
}

export default function UserPage() {
	return (
		<Box>
			<SignUp />
		</Box>
	)
}
