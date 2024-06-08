'use client'

import {
	Box,
	Container,
	HStack,
	Modal,
	ModalBody,
	ModalContent,
	PinInput,
	PinInputField,
	Step,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	Stepper,
	useSteps
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'

import UserLayoutComponent from '@/components/layouts/user.layout'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import StepperComponent from '@/components/ui/stepper'
import Description from '@/components/ui/texts/Description'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import { INTERFACE_WIDTH } from '@/config/_variables.config'
import { USER_PAGES } from '@/config/pages-url.config'

import { IRegisterForm } from '@/models/auth.model'

const SignUp = () => {
	const [value, setValue] = useState<IRegisterForm>({
		full_name: '',
		phone: '',
		password1: '',
		password2: '',
		code: ''
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 3
	})

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!activeStep) setActiveStep(1)
		else if (activeStep === 1) setActiveStep(2)
		else if (activeStep === 2) setActiveStep(0)
	}

	// setActiveStep(index)
	return (
		<UserLayoutComponent
			question='У вас уже есть аккаунт? '
			path={USER_PAGES.AUTH}
			action='Войти'
		>
			<Box>
				<TitleComponent mb='26px'>Регистрация</TitleComponent>

				<StepperComponent
					activeStep={activeStep}
					setActiveStep={setActiveStep}
				/>

				{activeStep === 0 && (
					<form onSubmit={onSubmit}>
						<InputComponent
							handleChange={handleChange}
							name='full_name'
							placeholder='Ваше полное имя'
							title='Имя и Фамилия'
							value={value.full_name}
						/>
						<PhoneInputComponent
							handleChange={phone => setValue({ ...value, phone })}
							placeholder='+996'
							value={value.phone}
						/>
						<DefButton
							mt='3'
							type='submit'
						>
							Далее
						</DefButton>
					</form>
				)}
				{activeStep === 1 && (
					<form onSubmit={onSubmit}>
						<InputComponent
							handleChange={handleChange}
							name='password1'
							placeholder='Должно быть 8 символов'
							type='password'
							title='Пароль'
							value={value.password1}
						/>
						<InputComponent
							handleChange={handleChange}
							name='password2'
							placeholder='Повторите пароль'
							type='password'
							title='Подтвердите пароль'
							value={value.password2}
						/>
						<DefButton
							mt='3'
							type='submit'
						>
							Создать аккаунт
						</DefButton>
					</form>
				)}

				<Modal
					isOpen={activeStep === 2}
					onClose={() => setActiveStep(1)}
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
								question='Я не получил код'
								onClick={() => {}}
								action='Запросить'
								backFn={() => setActiveStep(1)}
							>
								<Box>
									<TitleComponent mb='26px'>Введите код</TitleComponent>
									<StepperComponent
										activeStep={activeStep}
										setActiveStep={setActiveStep}
									/>
									<Box
										textAlign='center'
										mb='5'
									>
										<Description>Мы отправили код на ваш телефон</Description>
										<Description fontWeight='500'>{value.phone}</Description>
									</Box>
									<HStack
										mx='auto'
										my={5}
										justifyContent='center'
									>
										<PinInput
											type='number'
											size='lg'
											onChange={code => setValue({ ...value, code })}
											value={value.code}
											placeholder=''
											variant='none'

											// isDisabled={isDisabled}
										>
											{[1, 2, 3, 4, 5].map(el => (
												<PinInputField
													w='63px'
													h='72px'
													rounded='15px'
													key={el}
													bg='white'
													border='1px solid #D8DADC'
													_focus={{ border: '1px solid #1C1C1C' }}
												/>
											))}
										</PinInput>
									</HStack>
									{!true && (
										<Description
											color='#F54135'
											mt='26px'
											textAlign='center'
										>
											Неправильный код, попробуйте еще раз
										</Description>
									)}
								</Box>
							</UserLayoutComponent>
						</ModalBody>
					</ModalContent>
				</Modal>
			</Box>
		</UserLayoutComponent>
	)
}

export default SignUp
