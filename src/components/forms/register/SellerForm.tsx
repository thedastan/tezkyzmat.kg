import { useSteps } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'

import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import SelectComponent from '@/components/ui/inputs/SelectComponent'
import StepperComponent from '@/components/ui/stepper'

import { useRegister } from '@/hooks/useRegister'

import PinInputModal from '../../../app/user/sign-up/(components)/PinInputModal'
import UploadPhotos from '../upload-photos'

import { SellerRegisterForm } from '@/models/value-interfaces/auth.values'

const SellerForm = () => {
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 4
	})
	const [images, setImages] = useState<File[]>([])

	const [value, setValue] = useState<SellerRegisterForm>({
		full_name: '',
		phone: '',
		password: '',
		address: '',
		shop_name: ''
	})

	const { mutate, isPending } = useRegister(() => setActiveStep(2))

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!activeStep) setActiveStep(1)
		else if (activeStep === 1) setActiveStep(2)
		else if (activeStep === 2) setActiveStep(3)
	}
	return (
		<>
			<StepperComponent
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				steps={[1, 2, 3, 4]}
			/>
			{activeStep === 0 && (
				<form onSubmit={onSubmit}>
					<InputComponent
						handleChange={handleChange}
						name='full_name'
						placeholder='Ваше полное имя'
						title='Имя и Фамилия*'
						value={value.full_name}
					/>
					<PhoneInputComponent
						handleChange={phone => setValue({ ...value, phone })}
						placeholder='+996'
						title='Номер*'
						value={value.phone}
					/>
					<InputComponent
						handleChange={handleChange}
						name='password'
						placeholder='Придумайте пароль'
						type='password'
						title='Пароль*'
						value={value.password}
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
					<SelectComponent
						handleChange={handleChange}
						name='brand'
						placeholder='Марка автомобиля*'
					/>
					<SelectComponent
						handleChange={handleChange}
						name='model'
						placeholder='Модель*'
					/>
					<DefButton
						mt='3'
						type='submit'
					>
						Далее
					</DefButton>
				</form>
			)}

			{activeStep === 2 && (
				<form onSubmit={onSubmit}>
					<InputComponent
						handleChange={handleChange}
						name='address'
						placeholder='Адрес магазина'
						title='Адрес*'
						value={value.address}
					/>
					<InputComponent
						handleChange={handleChange}
						name='shop_name'
						placeholder='Название магазина'
						title='Название'
						value={value.shop_name}
					/>
					<UploadPhotos
						images={images}
						setImages={setImages}
						text='Фото вашего магазина'
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
				isOpen={activeStep === 3}
			/>
		</>
	)
}

export default SellerForm
