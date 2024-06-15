'use client'

import { Box } from '@chakra-ui/react'

import ClientForm from '@/components/forms/register/ClientForm'
import SellerForm from '@/components/forms/register/SellerForm'
import UserLayoutComponent from '@/components/layouts/user.layout'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import { PUBLIC_PAGES, USER_PAGES } from '@/config/pages-url.config'
import { EnumRole } from '@/config/role'

import { useRoles } from '@/hooks/useRoles'

const SignUp = () => {
	const { role } = useRoles()

	return (
		<UserLayoutComponent
			question='У вас уже есть аккаунт? '
			path={USER_PAGES.AUTH(role)}
			action='Войти'
			backPath={PUBLIC_PAGES.HOME}
		>
			<Box>
				<TitleComponent mb='26px'>Регистрация</TitleComponent>
				{role === EnumRole.CLIENT && <ClientForm />}
				{role === EnumRole.SELLER && <SellerForm />}
			</Box>
		</UserLayoutComponent>
	)
}

export default SignUp
