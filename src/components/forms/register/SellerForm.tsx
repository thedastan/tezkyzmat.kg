import { useSteps } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'

import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import CheckboxOption from '@/components/ui/card/CheckboxOption'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import SelectCheckbox from '@/components/ui/inputs/SelectCheckbox'
import SelectComponent from '@/components/ui/inputs/SelectComponent'
import StepperComponent from '@/components/ui/stepper'

import { EnumRole } from '@/config/role'

import { useCity } from '@/hooks/useCity'
import { useRegister } from '@/hooks/useRegister'
import { useVehicle, useVehicleById } from '@/hooks/useVehicle'

import PinInputModal from '../../../app/user/sign-up/(components)/PinInputModal'
import UploadPhotos from '../upload-photos'

import { ISpareData } from '@/models/spares.model'
import { SellerRegisterForm } from '@/models/value-interfaces/auth.values'

const SellerForm = () => {
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 4
	})
	const [images, setImages] = useState<string[]>([])

	const [value, setValue] = useState<SellerRegisterForm>({
		full_name: '',
		phone: '',
		password: '',
		address: '',
		shop: '',
		model: '',
		brand: '',
		city: '',
		market: ''
	})

	const { mutate, isPending } = useRegister(() => setActiveStep(3))
	const { data, isLoading } = useVehicle()

	const { data: vehicle, isLoading2 } = useVehicleById(value?.brand || 0)
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
		else if (activeStep === 1) setActiveStep(2)
		else if (activeStep === 2) {
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
			{(isLoading || isLoading2 || isPending || isLoading3) && <Spinner />}
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
						value={value?.brand}
						name='brand'
						placeholder='Марка автомобиля*'
						required={false}
					>
						{data?.map(el => (
							<option
								value={el.id}
								key={el.id}
							>
								{el.brand}
							</option>
						))}
					</SelectComponent>

					<SelectComponent
						handleChange={handleChange}
						value={value?.model}
						name='model'
						placeholder='Модель*'
						disabled={!value?.brand}
						required={false}
					>
						{vehicle?.models?.map(el => (
							<option
								value={el.id}
								key={el.id}
							>
								{el.model}
							</option>
						))}
					</SelectComponent>

					<DefButton type='submit'>Далее</DefButton>
				</form>
			)}

			{activeStep === 2 && (
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
					{/* <SelectCheckbox
						list={city}
						handleChange={handleCheckbox}
						name='city'
						placeholder='Город'
						value={value.city}
					/> */}
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
					{/* <SelectCheckbox
						list={markets}
						handleChange={handleCheckbox}
						name='market'
						placeholder='Название рынка'
						value={value.market}
					/> */}
					<InputComponent
						handleChange={handleChange}
						name='address'
						placeholder='Адрес по карте'
						title='Детальный адрес'
						value={value.address}
					/>
					<InputComponent
						handleChange={handleChange}
						name='shop'
						placeholder='Название магазина'
						title='Название'
						value={value.shop}
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
