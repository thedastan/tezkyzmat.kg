'use client'

import {
	Box,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
	Textarea
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { PiEyeClosedFill, PiEyeFill } from 'react-icons/pi'

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
	const [show, setShow] = useState(false)
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
				<InputGroup>
					<Input
						onChange={handleChange}
						value={value}
						name={name}
						type={show ? 'text' : type}
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
						autoFocus={false}
					/>
					{type === 'password' && (
						<InputRightElement
							w='3rem'
							h='100%'
							display='flex'
							alignItems='center'
						>
							<Box
								onClick={() => setShow(!show)}
								fontSize='24px'
								color='#A8A8A8'
								cursor='pointer'
							>
								{show ? <PiEyeFill /> : <PiEyeClosedFill />}
							</Box>
						</InputRightElement>
					)}
				</InputGroup>
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
