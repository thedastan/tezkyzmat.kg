'use client'

import { Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'

import UserLayoutComponent from '@/components/layouts/user.layout'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import { PUBLIC_PAGES, USER_PAGES } from '@/config/pages-url.config'

const Login = () => {
	return (
		<UserLayoutComponent
			question='У вас нет учетной записи? '
			path={USER_PAGES.SIGN_UP}
			action='Создать аккаунт'
		>
			<Box>
				<TitleComponent mb='34px'>Вход</TitleComponent>
				<InputComponent
					placeholder='+996'
					name='phone'
					title='Номер'
					type='tel'
				/>
				<InputComponent
					placeholder='Введите пароль'
					name='password'
					title='Пароль'
					type='password'
				/>
				<Flex
					justifyContent='end'
					fontWeight='400'
					fontSize='14px'
					lineHeight='17.5px'
					color='#000000'
					mt='-7px'
				>
					<Link href={PUBLIC_PAGES.RESET_PASSWORD}>Забыли пароль?</Link>
				</Flex>
				<DefButton
					mt='34px'
					type='submit'
				>
					Продолжить
				</DefButton>
			</Box>
		</UserLayoutComponent>
	)
}

export default Login
