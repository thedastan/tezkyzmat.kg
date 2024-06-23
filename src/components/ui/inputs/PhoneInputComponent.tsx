import { Stack, Text } from '@chakra-ui/react'
import {
	CountryData,
	PhoneInput,
	defaultCountries,
	parseCountry
} from 'react-international-phone'
import 'react-international-phone/style.css'

export interface IInputComponentProps {
	name?: string
	placeholder: string
	value?: string
	handleChange?: (value: string) => void
	required?: boolean
	title?: string
}

const PhoneInputComponent = ({
	name = 'phone',
	placeholder,
	value,
	handleChange,
	required = true,
	title = 'Номер'
}: IInputComponentProps) => {
	const countries = defaultCountries.filter(country => {
		const { iso2 } = parseCountry(country)
		return ['kg'].includes(iso2)
	})
	return (
		<Stack
			spacing='6px'
			mb='22px'
		>
			<Text
				color='#000000'
				fontWeight='400'
				fontSize='14px'
				lineHeight='17.5px'
			>
				{title}
			</Text>
			<PhoneInput
				defaultCountry='kg'
				countries={countries}
				name={name}
				value={value}
				required={required}
				onChange={handleChange}
				className={'phone-input'}
				placeholder={placeholder}
				autoFocus={false}
			/>
		</Stack>
	)
}

export default PhoneInputComponent
