'use client'

import { Flex } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

import UserLayoutComponent from '@/components/layouts/user.layout'
import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import { ToastError } from '@/config/helpers'
import {
	CLIENT_PAGES,
	LOGISTICIAN_PAGES,
	PUBLIC_PAGES,
	SELLER_PAGES,
	USER_PAGES
} from '@/config/pages-url.config'
import { EnumRole } from '@/config/role'

import { useRoles } from '@/hooks/useRoles'

import { IAuthForm } from '@/models/auth.model'
import { authService } from '@/services/auth.service'
import { saveUserRole } from '@/services/role.service'

const Login = () => {
	const { replace } = useRouter()
	const [value, setValue] = useState<IAuthForm>({
		phone: '',
		password: ''
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const { role } = useRoles()
	const { mutate, isPending } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.login(data),
		onSuccess({ role: respRole }) {
			saveUserRole(respRole)
			toast.success('Вы успешно авторизовались. Подождите...')
			if (respRole === EnumRole.CLIENT) replace(CLIENT_PAGES.MAIN)
			else if (respRole === EnumRole.SELLER) replace(SELLER_PAGES.HOME)
			else if (respRole === EnumRole.LOGISTICIAN)
				replace(LOGISTICIAN_PAGES.MAIN)
		},
		onError(e) {
			ToastError(e)
		}
	})

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		mutate({ ...value, role })
	}

	return (
		<UserLayoutComponent
			question='У вас нет учетной записи? '
			path={USER_PAGES.SIGN_UP}
			action='Создать аккаунт'
			backPath={PUBLIC_PAGES.HOME}
		>
			<form onSubmit={onSubmit}>
				{isPending && <Spinner />}
				<TitleComponent mb='34px'>Вход</TitleComponent>
				<PhoneInputComponent
					handleChange={phone => setValue({ ...value, phone })}
					placeholder='+996'
					name='phone'
					title='Номер'
				/>
				<InputComponent
					handleChange={handleChange}
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
			</form>
		</UserLayoutComponent>
	)
}

export default Login
