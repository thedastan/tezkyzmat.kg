'use client'

import { Button, Flex, useSteps } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'

import AdditionalRequestForm from '@/components/forms/client/additional-request-form'
import UploadPhotos from '@/components/forms/upload-photos'
import BlackInterface from '@/components/layouts/black-interface'
import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import SelectComponent from '@/components/ui/inputs/SelectComponent'
import StepperComponent from '@/components/ui/stepper'
import Description from '@/components/ui/texts/Description'

import { IRequestForm } from '@/models/value-interfaces/request.values'

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

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}
	return (
		<BlackInterface>
			{!false ? (
				<Flex
					h='100%'
					flexDirection='column'
					justifyContent='space-between'
				>
					<StepperComponent
						activeStep={activeStep}
						setActiveStep={setActiveStep}
						withText={true}
					/>
					{!activeStep && (
						<form onSubmit={onSubmit}>
							<SelectComponent
								handleChange={handleChange}
								name='brand'
								placeholder='Марка автомобиля*'
								value={value?.brand}
							/>
							<SelectComponent
								handleChange={handleChange}
								value={value?.model}
								name='model'
								placeholder='Модель*'
							/>
							<SelectComponent
								handleChange={handleChange}
								value={value?.year}
								name='year'
								placeholder='Год выпуска*'
							/>
							<InputComponent
								handleChange={handleChange}
								value={value?.volume}
								name='volume'
								placeholder='XXX'
								title='Объем*'
							/>
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
