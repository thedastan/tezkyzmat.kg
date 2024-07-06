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

const LOCALE_REQUEST_KEY = 'request'
const LOCALE_REQUEST_LIST_KEY = 'requests-history'

const RequestComponent = () => {
	const pathname = usePathname()
	const { push } = useRouter()
	const [images, setImages] = useState<string[]>([])

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
		// const localRequest: IRequestForm = getLocaleStorage(LOCALE_REQUEST_KEY)
		const localRequestHistory: IRequestForm[] =
			getLocaleStorage(LOCALE_REQUEST_LIST_KEY) || []
		const history = [...localRequestHistory, value]
		addLocaleStorage(LOCALE_REQUEST_LIST_KEY, history)
		removeLocaleStorage(LOCALE_REQUEST_KEY)

		push(CLIENT_PAGES.SUCCESS)
	}
	const { mutate, isPending } = useRequestAdd(onSuccess)

	function addRequest() {
		const userWithoutToken = pathname === USER_PAGES.REQUEST
		if (userWithoutToken) {
			localStorage.setItem(LOCALE_REQUEST_KEY, JSON.stringify(value))
			push(USER_PAGES.AUTH(EnumRole.CLIENT))
			toast('Необходимо авторизоваться..')
		} else mutate({ ...value, image: JSON.stringify(images) })
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!activeStep) setActiveStep(1)
		else if (activeStep === 1) addRequest()
		else if (activeStep === 2) addRequest()
	}

	useEffect(() => {
		const localRequest: IRequestForm = getLocaleStorage(LOCALE_REQUEST_KEY)

		if (!!localRequest) {
			setValue({ ...localRequest })
			setActiveStep(1)
			// mutate(localRequest)
		}
	}, [])
	return (
		<BlackInterface>
			{!false ? (
				<Flex
					h='100%'
					flexDirection='column'
					justifyContent='space-between'
				>
					{(isLoading || isLoading2 || isPending) && <Spinner />}
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
								images={images}
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
