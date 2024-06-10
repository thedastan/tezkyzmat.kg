import { ChangeEvent, FormEvent, useState } from 'react'

import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import SelectComponent from '@/components/ui/inputs/SelectComponent'

import { IRequestAdditionalForm } from '@/models/value-interfaces/request.values'

// {
// 		category: '',
// 		body_type: '',
// 		condition: '',
// 		production: '',
// 		vin_code: ''
// 	}

interface AdditionalRequestFormProps {}
const AdditionalRequestForm = () => {
	const [value, setValue] = useState<IRequestAdditionalForm>()
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setValue({
			...value,
			[e.target.name]: e.target.value
		} as IRequestAdditionalForm)
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}
	return (
		<form onSubmit={onSubmit}>
			<SelectComponent
				handleChange={handleChange}
				value={value?.category}
				name='category'
				placeholder='Категория запчасти'
			/>
			<SelectComponent
				handleChange={handleChange}
				value={value?.production}
				name='production'
				placeholder='Производство'
			/>
			<SelectComponent
				handleChange={handleChange}
				value={value?.body_type}
				name='body_type'
				placeholder='Тип кузова'
			/>
			<InputComponent
				handleChange={handleChange}
				value={value?.condition}
				name='condition'
				placeholder='Б/У или новый'
				title='Состояние'
			/>
			<DefButton type='submit'>Оформить заявку</DefButton>
		</form>
	)
}

export default AdditionalRequestForm
