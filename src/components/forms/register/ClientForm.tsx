import { useSteps } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'

import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import StepperComponent from '@/components/ui/stepper'

import PinInputModal from '../../../app/user/sign-up/(components)/PinInputModal'

import { ClientRegisterForm } from '@/models/auth.model'

const ClientForm = () => {
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 3
	})

	const [value, setValue] = useState<ClientRegisterForm>({
		full_name: '',
		phone: '',
		password1: '',
		password2: '',
		code: ''
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!activeStep) setActiveStep(1)
		else if (activeStep === 1) setActiveStep(2)
		else if (activeStep === 2) setActiveStep(0)
	}
	return (
		<>
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

			<PinInputModal
				activeStep={activeStep}
				code={value.code}
				phone={value.phone}
				setActiveStep={setActiveStep}
				setCode={code => setValue({ ...value, code })}
			/>
		</>
	)
}

export default ClientForm
