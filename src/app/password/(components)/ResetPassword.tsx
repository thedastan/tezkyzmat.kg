'use client'

import {
	Box,
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	useDisclosure,
	useSteps
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { BiSolidLock } from 'react-icons/bi'

import UserLayoutComponent from '@/components/layouts/user.layout'
import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import Description from '@/components/ui/texts/Description'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import { INTERFACE_WIDTH } from '@/config/_variables.config'
import { USER_PAGES } from '@/config/pages-url.config'

import { useOtpSent, useResetPassword } from '@/hooks/useRegister'
import { useRoles } from '@/hooks/useRoles'

import PinInputModal from '@/app/user/sign-up/(components)/PinInputModal'
import { EnumOtpCode } from '@/models/auth.enum'
import { ResetPasswordPayload } from '@/models/auth.model'

const ResetPassword = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 3
	})
	const { replace } = useRouter()
	const [value, setValue] = useState<ResetPasswordPayload>({
		phone: '',
		password: '',
		code: ''
	})
	const { role } = useRoles()
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const { isPending, mutate } = useOtpSent(() => setActiveStep(1))

	const { mutate: reset, isPending: isPending2 } = useResetPassword(onOpen)

	const onReset = (code: string) => {
		reset({ phone: value.phone, password: value.password, code })
	}
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		mutate({ phone: value.phone, type: EnumOtpCode.RESET_PASSWORD })
	}
	return (
		<>
			<UserLayoutComponent
				question='У вас нет учетной записи? '
				path={USER_PAGES.SIGN_UP}
				action='Создать аккаунт'
				backPath={USER_PAGES.AUTH(role)}
			>
				<form onSubmit={onSubmit}>
					<TitleComponent mb='34px'>Изменить пароль</TitleComponent>
					{isPending && <Spinner />}
					<PhoneInputComponent
						handleChange={phone => setValue({ ...value, phone })}
						placeholder='+996'
						title='Номер*'
						value={value.phone}
					/>
					<InputComponent
						handleChange={handleChange}
						placeholder='Должно быть больше 3х символов'
						type='password'
						name='password'
						title='Новый пароль'
						value={value.password}
					/>
					{/* <InputComponent
						handleChange={handleChange}
						placeholder='Повторите пароль'
						type='password'
						name='password2'
						title='Подтвердите пароль'
						value={value.password2}
					/> */}

					<DefButton
						mt='34px'
						type='submit'
					>
						Сохранить
					</DefButton>
				</form>
			</UserLayoutComponent>

			<PinInputModal
				activeStep={activeStep}
				phone={value.phone}
				setActiveStep={setActiveStep}
				isOpen={activeStep === 1}
				onSubmit={onReset}
				loading={isPending2}
			/>
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
									onClick={() => replace(USER_PAGES.AUTH(role))}
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
