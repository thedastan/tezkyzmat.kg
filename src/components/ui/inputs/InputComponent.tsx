import { Input, Stack, Text, Textarea } from '@chakra-ui/react'
import React from 'react'

export interface IInputComponentProps {
	name: string
	placeholder: string
	type?: string
	value?: string
	as?: 'input' | 'textArea'
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleChangeTextarea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	required?: boolean
	title: string
}

const InputComponent = ({
	name,
	placeholder,
	value,
	handleChange,
	handleChangeTextarea,
	type = 'text',
	required = true,
	as = 'input',
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

			{as === 'input' ? (
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
			) : (
				<Textarea
					onChange={handleChangeTextarea}
					value={value}
					name={name}
					placeholder={placeholder}
					h='98px'
					pt='18px'
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
			)}
		</Stack>
	)
}

export default InputComponent
