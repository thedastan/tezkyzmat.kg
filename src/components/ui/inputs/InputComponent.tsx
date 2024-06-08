import { Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export interface IInputComponentProps {
	name: string
	placeholder: string
	type?: string
	value?: string
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	required?: boolean
	title: string
}

const InputComponent = ({
	name,
	placeholder,
	value,
	handleChange,
	type = 'text',
	required = true,
	title
}: IInputComponentProps) => {
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

			<Input
				onChange={handleChange}
				value={value}
				name={name}
				type={type}
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
			/>
		</Stack>
	)
}

export default InputComponent
