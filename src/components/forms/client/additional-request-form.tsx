import { ChangeEvent, FormEvent } from 'react'

import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import SelectComponent from '@/components/ui/inputs/SelectComponent'

import { useBody, useCountry } from '@/hooks/useSpares'

import {
	IRequestForm,
	condition_order_array
} from '@/models/value-interfaces/request.values'

interface AdditionalRequestFormProps {
	value?: IRequestForm
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
	handleChange: (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => void
}
const AdditionalRequestForm = ({
	value,
	handleChange,
	onSubmit
}: AdditionalRequestFormProps) => {
	const { country, isLoading } = useCountry()
	const { body, isLoading2 } = useBody()

	return (
		<form onSubmit={onSubmit}>
			{(isLoading || isLoading2) && <Spinner />}
			<SelectComponent
				handleChange={handleChange}
				value={value?.country}
				name='country'
				placeholder='Производство'
				required={false}
			>
				{country?.map(el => (
					<option
						value={el.id}
						key={el.id}
					>
						{el.name}
					</option>
				))}
			</SelectComponent>
			<SelectComponent
				handleChange={handleChange}
				value={value?.body}
				name='body'
				placeholder='Тип кузова'
				required={false}
			>
				{body?.map(el => (
					<option
						value={el.id}
						key={el.id}
					>
						{el.name}
					</option>
				))}
			</SelectComponent>

			<SelectComponent
				handleChange={handleChange}
				value={value?.condition}
				name='condition'
				placeholder='Состояние'
				required={false}
			>
				{condition_order_array.map((el, idx) => (
					<option
						value={el.value}
						key={idx}
					>
						{el.name}
					</option>
				))}
			</SelectComponent>

			<InputComponent
				name='VIN'
				placeholder='XXX'
				title='Vin-код'
				handleChange={handleChange}
				value={value?.VIN}
				required={false}
			/>
			<DefButton type='submit'>Оформить заявку</DefButton>
		</form>
	)
}

export default AdditionalRequestForm

// <SelectCheckbox
// 			handleChange={handleCheckbox}
// 			list={country}
// 			value={value?.country?.map(el => el.name) || []}
// 			name='country'
// 			placeholder='Производство'
// 		/>

{
	/* <SelectCheckbox
	handleChange={handleCheckbox}
	list={body}
	value={value?.body?.map(el => el.name) || []}
	name='body'
	placeholder='Тип кузова'
/> */
}

// const handleCheckbox = (name: string, valueList: string[]) => {
// 	setValue({
// 		...value,
// 		[name]: valueList.map(el => JSON.parse(el))
// 	} as IRequestAdditionalForm)
// }
