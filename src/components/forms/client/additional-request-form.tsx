import { ChangeEvent, FormEvent, useState } from 'react'

import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import SelectCheckbox from '@/components/ui/inputs/SelectCheckbox'

import { useBody, useCountry } from '@/hooks/useSpares'

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

	const { country, isLoading } = useCountry()
	const { body, isLoading2 } = useBody()
	const handleCheckbox = (name: string, valueList: string[] | string) => {
		setValue({ ...value, [name]: valueList } as IRequestAdditionalForm)
	}
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}
	return (
		<form onSubmit={onSubmit}>
			{(isLoading || isLoading2) && <Spinner />}
			<SelectCheckbox
				handleChange={handleCheckbox}
				list={country}
				value={value?.production || []}
				name='production'
				placeholder='Производство'
			/>
			<InputComponent
				handleChange={handleChange}
				value={value?.volume}
				name='volume'
				placeholder='XXX'
				title='Объем*'
			/>
			<SelectCheckbox
				handleChange={handleCheckbox}
				list={body}
				value={value?.body_type || []}
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
