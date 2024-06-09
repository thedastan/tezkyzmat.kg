import { useSteps } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'

import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import StepperComponent from '@/components/ui/stepper'

import PinInputModal from '../../../app/user/sign-up/(components)/PinInputModal'
import UploadPhotos from '../upload-photos'
import AddPhotoButton from '../upload-photos/AddPhotoButton'

import { SellerRegisterForm } from '@/models/auth.model'

const SellerForm = () => {
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 3
	})
	const [images, setImages] = useState<File[]>([])

	const [value, setValue] = useState<SellerRegisterForm>({
		full_name: '',
		phone: '',
		password: '',
		address: '',
		shop_name: '',
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
				code={value.code}
				phone={value.phone}
				setActiveStep={setActiveStep}
				setCode={code => setValue({ ...value, code })}
			/>
		</>
	)
}

export default SellerForm
