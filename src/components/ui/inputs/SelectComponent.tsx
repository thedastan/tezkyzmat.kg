import { Select, Stack } from '@chakra-ui/react'

export interface ISelectComponentProps {
	name: string
	placeholder: string
	value?: string
	handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
	required?: boolean
}
const SelectComponent = ({
	name,
	placeholder,
	value,
	handleChange,
	required = true
}: ISelectComponentProps) => {
	return (
		<Stack>
			<Select
				onChange={handleChange}
				value={value}
				name={name}
				placeholder={placeholder}
				h='56px'
				w='100%'
				rounded='10px'
				border='1px solid #D8DADC'
				bg='#FFFFFF'
				fontSize='16px'
				letterSpacing='0.5px'
				fontWeight='400'
				lineHeight='20px'
				color='#000000'
				_placeholder={{
					color: '#00000080'
				}}
				isRequired={required}
			>
				<option>Tayota</option>
        <option>Honda</option>
        <option>Mercedes</option>
			</Select>
		</Stack>
	)
}

export default SelectComponent
