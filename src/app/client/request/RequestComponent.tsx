'use client'

import { Button, Flex, useSteps } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'
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

import { useVehicle, useVehicleById } from '@/hooks/useVehicle'

import { IRequestForm } from '@/models/value-interfaces/request.values'
import { IVehicleModel } from '@/models/vehicle.model'

const RequestComponent = () => {
	const [images, setImages] = useState<File[]>([])

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
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!activeStep) setActiveStep(1)
		else if (activeStep === 1) toast('Функция все ещё в разработке')
		else if (activeStep === 2) toast('Функция все ещё в разработке')
	}
	return (
		<BlackInterface>
			{!false ? (
				<Flex
					h='100%'
					flexDirection='column'
					justifyContent='space-between'
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
								disabled={!value?.brand}
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
					{activeStep === 2 && <AdditionalRequestForm />}
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
