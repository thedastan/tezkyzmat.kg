'use client'

import { Button, Flex, useSteps } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'

import UploadPhotos from '@/components/forms/upload-photos'
import BlackInterface from '@/components/layouts/black-interface'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import SelectComponent from '@/components/ui/inputs/SelectComponent'
import StepperComponent from '@/components/ui/stepper'

const RequestComponent = () => {
	const [images, setImages] = useState<File[]>([])
	const [value, setValue] = useState({
		brand: '',
		model: '',
		year: '',
		volume: '',
		description: ''
	})

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 3
	})
	return (
		<BlackInterface>
			<Flex
				h='100%'
				flexDirection='column'
				justifyContent='space-between'
			>
				<StepperComponent
					activeStep={activeStep}
					setActiveStep={setActiveStep}
				/>
				{!activeStep && (
					<form>
						<SelectComponent
							handleChange={handleChange}
							name='brand'
							placeholder='Марка автомобиля*'
							value={value.brand}
						/>
						<SelectComponent
							handleChange={handleChange}
							value={value.model}
							name='model'
							placeholder='Модель*'
						/>
						<SelectComponent
							handleChange={handleChange}
							value={value.year}
							name='year'
							placeholder='Год выпуска*'
						/>
						<InputComponent
							handleChange={handleChange}
							value={value.volume}
							name='volume'
							placeholder='XXX'
							title='Объем*'
						/>
						<DefButton type='submit'>Далее</DefButton>
					</form>
				)}
				{activeStep === 1 && (
					<form>
						<InputComponent
							handleChangeTextarea={handleChange}
							value={value.description}
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
			</Flex>
		</BlackInterface>
	)
}

export default RequestComponent
