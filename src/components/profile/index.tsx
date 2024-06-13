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
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState } from 'react'

import { INTERFACE_PADDING, INTERFACE_WIDTH } from '@/config/_variables.config'
import { USER_PAGES } from '@/config/pages-url.config'

import DefButton from '../ui/buttons/DefButton'
import InputComponent from '../ui/inputs/InputComponent'
import PhoneInputComponent from '../ui/inputs/PhoneInputComponent'

import AvatarUpload from './AvatarUpload'
import ChangePassword from './change-password'
import { removeFromStorage } from '@/services/auth-token.services'

interface ProfileProps {
	isOpen: boolean
	onClose: () => void
}
const Profile = ({ isOpen, onClose }: ProfileProps) => {
	const [innerHeight, setHeight] = useState(0)
	const { replace } = useRouter()
	const logout = () => {
		removeFromStorage()
		replace(USER_PAGES.AUTH)
	}

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
						<AvatarUpload />
					</Center>

					<InputComponent
						name='full_name'
						placeholder='Ваше полное имя'
						title='Имя и Фамилия'
					/>
					<PhoneInputComponent placeholder='' />
					<ChangePassword />
					<Text
						onClick={logout}
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
