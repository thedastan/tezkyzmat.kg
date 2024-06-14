import {
	Box,
	Checkbox,
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	Stack,
	Text
} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { INTERFACE_WIDTH } from '@/config/_variables.config'

import { ISpareData } from '@/models/spares.model'

interface SelectCheckboxProps {
	list: ISpareData[] | undefined
	value: string[]
	name: string
	placeholder: string
	handleChange: (name: string, list: string[] | string) => void
	required?: boolean
	disabled?: boolean
}
const SelectCheckbox = ({
	list,
	value,
	placeholder,
	disabled,
	handleChange,
	name,
	required
}: SelectCheckboxProps) => {
	return (
		<Stack
			mb='22px'
			position='relative'
			spacing='6px'
		>
			<Menu closeOnSelect={false}>
				<MenuButton
					as={Box}
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
					disabled={disabled}
					px='4'
					display='flex'
					alignItems='center'
					cursor='pointer'
				>
					<Text
						display={!!value.length ? 'block' : 'none'}
						transition='.2s'
						color='#1C1C1C'
						fontWeight='400'
						fontSize='12px'
						lineHeight='12px'
						mb='1'
					>
						{placeholder}
					</Text>
					<Text
						noOfLines={1}
						w='100%'
						transition='.2s'
					>
						{!!value.length ? value.join(', ') : placeholder}
					</Text>
				</MenuButton>
				<MenuList
					maxW={INTERFACE_WIDTH}
					w={'100%'}
					px='1'
					boxShadow='0px 0px 1px 0px #00000029'
					rounded='12px'
					className='unscroll'
					maxH='360px'
					overflowY='auto'
				>
					<MenuOptionGroup
						type='checkbox'
						title={placeholder}
						onChange={value => handleChange(name, value)}
					>
						{/* {children} */}
						{list?.map(el => (
							<MenuItemOption
								key={el.id}
								isChecked={value.includes(el.name)}
								value={el.name}
								display='flex'
								flexDirection='row-reverse'
								_checked={{ bg: '#0000000A', rounded: '10px' }}
								mb='2px'
								gap='20px'
							>
								{el.name}
							</MenuItemOption>
						))}
					</MenuOptionGroup>
				</MenuList>
			</Menu>
		</Stack>
	)
}

export default SelectCheckbox
