'use client'

import { Button, Flex, useSteps } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'

import AdditionalRequestForm from '@/components/forms/client/additional-request-form'
import UploadPhotos from '@/components/forms/upload-photos'
import BlackInterface from '@/components/layouts/black-interface'
import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import SelectComponent from '@/components/ui/inputs/SelectComponent'
import StepperComponent from '@/components/ui/stepper'
import Description from '@/components/ui/texts/Description'

import {
	LOCALE_REQUEST_KEY,
	LOCALE_REQUEST_LIST_KEY,
	NAVBAR_HEIGHT
} from '@/config/_variables.config'
import {
	addLocaleStorage,
	getLocaleStorage,
	removeLocaleStorage
} from '@/config/helpers'
import { CLIENT_PAGES, USER_PAGES } from '@/config/pages-url.config'
import { EnumRole } from '@/config/role'

import { useRequestAdd } from '@/hooks/useRequest'
import { useVehicle, useVehicleById } from '@/hooks/useVehicle'

import { IRequestForm } from '@/models/value-interfaces/request.values'
import { IVehicleModel } from '@/models/vehicle.model'

const RequestComponent = () => {
	const pathname = usePathname()
	const { push } = useRouter()
	const [order_images, setImages] = useState<string[]>([])

	const [value, setValue] = useState<IRequestForm>()
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		setValue({ ...value, [e.target.name]: e.target.value } as IRequestForm)
	}

	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 3
	})

	const { data, isLoading } = useVehicle()
	const { data: vehicle, isLoading2 } = useVehicleById(value?.brand || 0)

	const model: IVehicleModel | undefined = vehicle?.models.find(
		el => String(el.id) === value?.model
	)

	const onSuccess = () => {
		const localRequestHistory: IRequestForm[] =
			getLocaleStorage(LOCALE_REQUEST_LIST_KEY) || []
		const history = [value, ...localRequestHistory].slice(0, 3)
		addLocaleStorage(LOCALE_REQUEST_LIST_KEY, history)
		removeLocaleStorage(LOCALE_REQUEST_KEY)

		push(CLIENT_PAGES.SUCCESS)
	}
	const { mutate, isPending } = useRequestAdd(onSuccess)

	function addRequest() {
		const userWithoutToken = pathname === USER_PAGES.REQUEST
		if (userWithoutToken) {
			localStorage.setItem(
				LOCALE_REQUEST_KEY,
				JSON.stringify(value as IRequestForm)
			)
			push(USER_PAGES.AUTH)
			toast('Необходимо авторизоваться..')
		} else mutate({ ...value } as IRequestForm)
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!activeStep) setActiveStep(1)
		else if (activeStep === 1) addRequest()
		else if (activeStep === 2) addRequest()
	}

	useEffect(() => {
		setValue({ ...value, order_images } as IRequestForm)
	}, [order_images])

	useEffect(() => {
		const localRequest: IRequestForm = getLocaleStorage(
			LOCALE_REQUEST_KEY
		) as IRequestForm
		console.log('localRequest:', localRequest)
		if (localRequest) {
			if (localRequest?.order_images) {
				setImages(localRequest.order_images)
			}

			setValue({ ...localRequest })

			setActiveStep(0)
		}

		/// потом удалю
		removeLocaleStorage('requests-history')
		removeLocaleStorage('requests-history-list')
	}, [])

	return (
		<BlackInterface role={EnumRole.CLIENT}>
			{!isPending ? (
				<Flex
					h='100%'
					flexDirection='column'
					justifyContent='space-between'
					pb={pathname === USER_PAGES.REQUEST ? NAVBAR_HEIGHT : '0'}
				>
					{(isLoading || isLoading2) && <Spinner />}
					<StepperComponent
						activeStep={activeStep}
						setActiveStep={setActiveStep}
						withText={true}
					/>
					{!activeStep && (
						<form onSubmit={onSubmit}>
							<SelectComponent
								handleChange={handleChange}
								value={value?.brand}
								name='brand'
								placeholder='Марка автомобиля*'
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
								disabled={!vehicle?.models.length}
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
							<SelectComponent
								handleChange={handleChange}
								value={value?.year}
								name='year'
								placeholder='Год выпуска*'
								disabled={!model}
							>
								{model?.year?.map(el => (
									<option
										value={el.id}
										key={el.id}
									>
										{el.year}
									</option>
								))}
							</SelectComponent>
							{!!model?.volume.length && (
								<SelectComponent
									handleChange={handleChange}
									value={value?.volume}
									name='volume'
									placeholder='Объем'
									disabled={!model?.volume.length}
								>
									{model?.volume?.map(el => (
										<option
											value={el.id}
											key={el.id}
										>
											{el.name}
										</option>
									))}
								</SelectComponent>
							)}
							<DefButton type='submit'>Далее</DefButton>
						</form>
					)}
					{activeStep === 1 && (
						<form onSubmit={onSubmit}>
							<InputComponent
								handleChangeTextarea={handleChange}
								value={value?.description}
								as='textArea'
								name='description'
								placeholder='Дополнительная информация'
								title='Описание*'
							/>
							<UploadPhotos
								images={order_images}
								setImages={setImages}
								text='Фото образца'
							/>
							<Flex justifyContent='center'>
								<Button
									onClick={() => setActiveStep(2)}
									my='3'
									py='0'
									textDecoration='underline'
									variant='none'
									mx='auto'
									fontWeight='600'
									fontSize='14px'
								>
									Указать детали машины (необязательно)
								</Button>
							</Flex>
							<DefButton type='submit'>Оформить заявку</DefButton>
						</form>
					)}
					{activeStep === 2 && (
						<AdditionalRequestForm
							handleChange={handleChange}
							value={value}
							onSubmit={onSubmit}
						/>
					)}

					{pathname === USER_PAGES.REQUEST && (
						<DefButton
							onClick={() => push(USER_PAGES.SIGN_UP)}
							bg='#F9BD15'
							mt='5'
						>
							Регистрация
						</DefButton>
					)}
				</Flex>
			) : (
				<Flex
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					gap='38.8px'
					pt='180px'
				>
					<Spinner fixed={false} />
					<Description
						maxW='289px'
						textAlign='center'
					>
						Возврат осуществляется в течение 3-х дней с момента покупки
					</Description>
				</Flex>
			)}
		</BlackInterface>
	)
}

export default RequestComponent
