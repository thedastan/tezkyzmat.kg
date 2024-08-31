import { Text, useSteps } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import StepperComponent from '@/components/ui/stepper'

import { CLIENT_PAGES } from '@/config/pages-url.config'

import { useRegister } from '@/hooks/useRegister'
import { useRoles } from '@/hooks/useRoles'

import PinInputModal from '../../../app/user/sign-up/(components)/PinInputModal'

import { ClientRegisterForm } from '@/models/value-interfaces/auth.values'

const ClientForm = () => {
	const [validation, setValid] = useState(false)
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 3
	})
	const { role } = useRoles()
	const [value, setValue] = useState<ClientRegisterForm>({
		full_name: '',
		phone: '',
		password1: '',
		password2: ''
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}
	const onSuccess = () => {
		setActiveStep(2)
	}
	const { mutate, isPending } = useRegister(onSuccess)

	// 'вы успешно зарегистрировались! подождите...'
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!activeStep) setActiveStep(1)
		else if (activeStep === 1) {
			mutate({
				full_name: value.full_name,
				user: { password: value.password1, phone: value.phone, role }
			})
		} else if (activeStep === 2) setActiveStep(0)
	}

	useEffect(() => {
		if (!!value.password1 && !!value.password2) {
			setValid(value.password1 !== value.password2)
		}
	}, [value.password1, value.password2])
	return (
		<>
			<StepperComponent
				activeStep={activeStep}
				setActiveStep={setActiveStep}
			/>
			{isPending && <Spinner />}
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

					{validation && (
						<Text
							color='#F54135'
							fontWeight='400'
							fontSize='14'
							mt='-10px'
						>
							Пароли не совпадают
						</Text>
					)}
					<DefButton
						mt='3'
						type='submit'
					>
						Создать аккаунт
					</DefButton>
				</form>
			)}

			<PinInputModal
				activeStep={activeStep}
				phone={value.phone}
				setActiveStep={setActiveStep}
				isOpen={activeStep === 2}
				success_path={CLIENT_PAGES.MAIN}
			/>
		</>
	)
}

export default ClientForm
