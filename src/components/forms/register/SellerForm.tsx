import { Text, useSteps } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'

import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import SelectComponent from '@/components/ui/inputs/SelectComponent'
import StepperComponent from '@/components/ui/stepper'

import { SELLER_PAGES } from '@/config/pages-url.config'
import { EnumRole } from '@/config/role'

import { useCity } from '@/hooks/useCity'
import { useRegister } from '@/hooks/useRegister'

import PinInputModal from '../../../app/user/sign-up/(components)/PinInputModal'
import UploadPhotos from '../upload-photos'

import { SellerRegisterForm } from '@/models/value-interfaces/auth.values'

const SellerForm = () => {
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 3
	})
	const [images, setImages] = useState<string[]>([])

	const [value, setValue] = useState<SellerRegisterForm>({
		full_name: '',
		phone: '',
		password: '',
		address: '',
		shop: '',
		city: '',
		market: ''
	})

	const onSuccess = () => {
		setActiveStep(2)
	}

	const { mutate, isPending } = useRegister(onSuccess)

	const { city, markets, isLoading: isLoading3 } = useCity(value.city)

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const handleCheckbox = (name: string, valueList: string[] | string) => {
		setValue({ ...value, [name]: valueList } as SellerRegisterForm)
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!activeStep) setActiveStep(1)
		else if (activeStep === 1) {
			mutate({
				user: {
					password: value.password,
					phone: value.phone,
					role: EnumRole.SELLER
				},
				address: value.address,
				city: Number(value.city),
				full_name: value.full_name,
				market: Number(value.market),
				shop: value.shop,
				images
			})
		}
	}
	return (
		<>
			{(isPending || isLoading3) && <Spinner />}
			<StepperComponent
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				steps={[1, 2, 3]}
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
						name='city'
						placeholder='Город'
						value={value.city}
					>
						{city?.map(el => (
							<option
								key={el.id}
								value={el.id}
							>
								{el.name}
							</option>
						))}
					</SelectComponent>

					<SelectComponent
						handleChange={handleChange}
						name='market'
						placeholder='Название рынка'
						value={value.market}
						disabled={!markets?.length}
					>
						{markets?.map(el => (
							<option
								key={el.id}
								value={el.id}
							>
								{el.name}
							</option>
						))}
					</SelectComponent>

					<InputComponent
						handleChange={handleChange}
						name='address'
						placeholder='8-ряд 18-контейнер'
						title='Детальный адрес'
						value={value.address}
					/>
					<InputComponent
						handleChange={handleChange}
						name='shop'
						placeholder='Название магазина'
						title='Название'
						value={value.shop}
						required={false}
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
				isOpen={activeStep === 2}
				success_path={SELLER_PAGES.HOME}
			/>
		</>
	)
}

export default SellerForm
