import { useSteps } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'

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
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 2
	})
	const { role } = useRoles()
	const [value, setValue] = useState<ClientRegisterForm>({
		// full_name: '',
		phone: '',
		password: ''
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}
	const onSuccess = () => {
		setActiveStep(1)
	}
	const { mutate, isPending } = useRegister(onSuccess)

	// 'вы успешно зарегистрировались! подождите...'
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!activeStep) {
			mutate({
				// full_name: value.full_name,
				user: { password: value.password, phone: value.phone, role }
			})
		} else if (activeStep === 1) setActiveStep(0)
	}

	return (
		<>
			<StepperComponent
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				steps={[1, 2]}
			/>
			{isPending && <Spinner />}
			{activeStep === 0 && (
				<form onSubmit={onSubmit}>
					<PhoneInputComponent
						handleChange={phone => setValue({ ...value, phone })}
						placeholder='+996'
						value={value.phone}
					/>
					<InputComponent
						handleChange={handleChange}
						name='password'
						placeholder='Должно быть 8 символов'
						type='password'
						title='Пароль'
						value={value.password}
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
				phone={value.phone}
				setActiveStep={setActiveStep}
				isOpen={activeStep === 1}
				success_path={CLIENT_PAGES.MAIN}
			/>
		</>
	)
}

export default ClientForm
