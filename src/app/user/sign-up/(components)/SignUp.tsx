'use client'

import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import ClientForm from '@/components/forms/register/ClientForm'
import SellerForm from '@/components/forms/register/SellerForm'
import UserLayoutComponent from '@/components/layouts/user.layout'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import { PUBLIC_PAGES, USER_PAGES } from '@/config/pages-url.config'
import { getRole } from '@/config/role'

const SignUp = () => {
	const [role, setRole] = useState(0)
	useEffect(() => {
		setRole(getRole())
	}, [])
	return (
		<UserLayoutComponent
			question='У вас уже есть аккаунт? '
			path={USER_PAGES.AUTH}
			action='Войти'
			backPath={PUBLIC_PAGES.HOME}
		>
			<Box>
				<TitleComponent mb='26px'>Регистрация</TitleComponent>

				{!!role ? <SellerForm /> : <ClientForm />}
			</Box>
		</UserLayoutComponent>
	)
}

export default SignUp
