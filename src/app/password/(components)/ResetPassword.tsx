'use client'

import {
	Box,
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { BiSolidLock } from 'react-icons/bi'

import UserLayoutComponent from '@/components/layouts/user.layout'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import Description from '@/components/ui/texts/Description'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import { INTERFACE_WIDTH } from '@/config/_variables.config'
import { USER_PAGES } from '@/config/pages-url.config'

const ResetPassword = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { replace } = useRouter()
	const [value, setValue] = useState({
		password1: '',
		password2: ''
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onOpen()
	}
	return (
		<>
			<UserLayoutComponent
				question='У вас нет учетной записи? '
				path={USER_PAGES.SIGN_UP}
				action='Создать аккаунт'
				backPath={USER_PAGES.AUTH}
			>
				<form onSubmit={onSubmit}>
					<TitleComponent mb='34px'>Вход</TitleComponent>

					<InputComponent
						handleChange={handleChange}
						placeholder='Должно быть 8 символов'
						type='password'
						name='password1'
						title='Новый пароль'
						value={value.password1}
					/>
					<InputComponent
						handleChange={handleChange}
						placeholder='Повторите пароль'
						type='password'
						name='password2'
						title='Подтвердите пароль'
						value={value.password2}
					/>

					<DefButton
						mt='34px'
						type='submit'
					>
						Сохранить
					</DefButton>
				</form>
			</UserLayoutComponent>

			<Modal
				isOpen={isOpen}
				onClose={() => {}}
				size='full'
			>
				<ModalContent
					justifyContent='center'
					transition='0'
				>
					<ModalBody
						maxW={INTERFACE_WIDTH}
						w='100%'
						mx='auto'
						padding='0'
					>
						<UserLayoutComponent
							question=''
							action=''
							backPath=''
							backFn={onClose}
						>
							<Box>
								<Flex
									w='99px'
									h='99px'
									bg='#FFEFC2'
									justifyContent='center'
									alignItems='center'
									rounded='50%'
									mx='auto'
								>
									<BiSolidLock
										color='#F9BD15'
										fontSize='48px'
									/>
								</Flex>
								<TitleComponent mt='34px'>Пароль изменен</TitleComponent>

								<Description
									mt='3'
									textAlign='center'
								>
									Ваш пароль успешно изменен
								</Description>
								<DefButton
									mt='52px'
									onClick={() => replace(USER_PAGES.AUTH)}
								>
									Вернуться
								</DefButton>
							</Box>
						</UserLayoutComponent>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ResetPassword
