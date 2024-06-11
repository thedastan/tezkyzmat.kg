'use client'

import {
	Avatar,
	Box,
	Center,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Stack,
	Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { INTERFACE_PADDING, INTERFACE_WIDTH } from '@/config/_variables.config'

import DefButton from '../ui/buttons/DefButton'
import InputComponent from '../ui/inputs/InputComponent'
import PhoneInputComponent from '../ui/inputs/PhoneInputComponent'

import ChangePassword from './change-password'

interface ProfileProps {
	isOpen: boolean
	onClose: () => void
}
const Profile = ({ isOpen, onClose }: ProfileProps) => {
	const [innerHeight, setHeight] = useState(0)

	useEffect(() => {
		setHeight(document.documentElement.clientHeight - 77)
		window.scroll(0, 0)
	}, [isOpen])
	return (
		<Drawer
			placement='bottom'
			onClose={onClose}
			isOpen={isOpen}
		>
			<DrawerOverlay bg='transparent' />
			<DrawerContent
				w={INTERFACE_WIDTH}
				borderTopRadius='30px'
				maxH={innerHeight + 'px'}
				h='100%'
				mx='auto'
				bg='#FFFFFF'
				className='unscroll'
				overflow='auto'
				pt='51px'
				pb='40px'
				px={INTERFACE_PADDING}
			>
				<Stack>
					<Center>
						<Avatar
							w='80px'
							h='80px'
							bg='#F4F5F7'
							mb='36px'
						/>
					</Center>

					<InputComponent
						name='full_name'
						placeholder='Ваше полное имя'
						title='Имя и Фамилия'
					/>
					<PhoneInputComponent placeholder='' />
					<ChangePassword />
					<Text
						cursor='pointer'
						mt='31px'
						textDecoration='underline'
						fontSize='14px'
						fontWeight='400'
						color='#1C1C1C'
						_active={{ opacity: '.7' }}
					>
						Выйти из аккаунта
					</Text>
					{/* <Box h='150px' /> */}
				</Stack>

				<Box mt='50px'>
					<DefButton>Сохранить</DefButton>
				</Box>
			</DrawerContent>
		</Drawer>
	)
}

export default Profile
