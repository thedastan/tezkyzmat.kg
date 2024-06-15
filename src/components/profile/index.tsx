'use client'

import {
	Box,
	Center,
	Container,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Stack,
	Text
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { INTERFACE_PADDING, INTERFACE_WIDTH } from '@/config/_variables.config'
import { USER_PAGES } from '@/config/pages-url.config'
import { EnumRole } from '@/config/role'

import { useRoles } from '@/hooks/useRoles'

import HeaderComponent from '../navbar/header-component'
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
	const { role } = useRoles()
	const { replace } = useRouter()
	const logout = () => {
		removeFromStorage()
		switch (role) {
			case EnumRole.CLIENT:
				replace(USER_PAGES.AUTH(EnumRole.CLIENT))
				break
			case EnumRole.SELLER:
				replace(USER_PAGES.AUTH(EnumRole.SELLER))
				break
			default:
				break
		}
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
			size='full'
		>
			<DrawerOverlay bg='transparent' />
			<DrawerContent
				w={INTERFACE_WIDTH}
				borderTopRadius='30px'
				// minH='90vh'
				h='100%'
				mx='auto'
				bg='transparent'
				className='unscroll'
				overflow='auto'
			>
				<Box
					padding='0'
					bg='#1C1C1C'
					h='75px'
				>
					<Container maxW={INTERFACE_WIDTH}>
						<HeaderComponent
							title='Профиль'
							backFn={onClose}
							color='#FFFFFF'
						/>
					</Container>
				</Box>
				<Box
					w='100%'
					borderTopRadius='30px'
					// minH={innerHeight + 'px'}
					px={INTERFACE_PADDING}
					// className='unscroll'
					h='100%'
					bg='#FFFFFF'
					pt='51px'
					pb='50px'
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
				</Box>
			</DrawerContent>
		</Drawer>
	)
}

export default Profile
