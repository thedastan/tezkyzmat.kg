'use client'

import {
	Box,
	Center,
	Container,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Stack,
	Text,
	useSteps
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { INTERFACE_PADDING, INTERFACE_WIDTH } from '@/config/_variables.config'
import { USER_PAGES } from '@/config/pages-url.config'
import { EnumRole, ProfileUserTypes, getRoleByIndex } from '@/config/role'

import { useProfile, useUpdateProfile } from '@/hooks/useProfile'
import { useOtpSent } from '@/hooks/useRegister'
import { useRoles } from '@/hooks/useRoles'

import Spinner from '../loader/spinner'
import HeaderComponent from '../navbar/header-component'
import DefButton from '../ui/buttons/DefButton'
import InputComponent from '../ui/inputs/InputComponent'
import PhoneInputComponent from '../ui/inputs/PhoneInputComponent'

import AvatarUpload from './AvatarUpload'
import ChangePassword from './change-password'
import PinInputModal from '@/app/user/sign-up/(components)/PinInputModal'
import { EnumOtpCode } from '@/models/auth.enum'
import { removeFromStorage } from '@/services/auth-token.services'

interface IProfileValue {
	full_name: string
	phone: string
	address?: string
}

interface ProfileProps {
	isOpen: boolean
	onClose: () => void
}
const Profile = ({ isOpen, onClose }: ProfileProps) => {
	const { role } = useRoles()
	const { push } = useRouter()
	const { data } = useProfile()

	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 2
	})
	const [value, setValue] = useState<IProfileValue>({
		full_name: '',
		phone: ''
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const permittedPages = role === EnumRole.CLIENT || role === EnumRole.SELLER
	const logout = () => {
		removeFromStorage()
		push(USER_PAGES.AUTH)
	}

	const { isPending: isPending2, mutate: sentOtp } = useOtpSent(() =>
		setActiveStep(1)
	)
	const { mutate: update, isPending } = useUpdateProfile()

	const onUpdate = () => {
		if (permittedPages) {
			const type: ProfileUserTypes = getRoleByIndex(role)

			const payload = {
				type,
				payload: {
					phone: value.phone,
					profile: { full_name: value.full_name, address: value.address }
				}
			}
			update(payload)
		} else {
			toast.error(
				'вы не можете изменить данные, если вы не являетесь продавцом или покупателем'
			)
		}
	}

	const onsubmit = () => {
		if (data?.phone === value.phone) {
			onUpdate()
		} else {
			sentOtp({ phone: value.phone, type: EnumOtpCode.CHANGE_PHONE })
		}
	}

	useEffect(() => {
		if (!!data) {
			const data_value = {
				full_name: `${data.profile?.full_name}`,
				phone: data.phone
			}
			data.profile?.address
				? setValue({ ...data_value, address: data.profile.address })
				: setValue(data_value)
		}
	}, [data])
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
					px={INTERFACE_PADDING}
					maxH='100%'
					h='100%'
					bg='#FFFFFF'
					pt='51px'
					pb='20px'
				>
					{isPending && <Spinner />}
					<Stack>
						<Center>
							<AvatarUpload />
						</Center>

						<InputComponent
							name='full_name'
							placeholder='Ваше полное имя'
							title='Имя и Фамилия'
							value={value.full_name}
							handleChange={handleChange}
						/>
						{role === EnumRole.SELLER && (
							<InputComponent
								name='address'
								placeholder='Ваш адрес'
								title='Адрес'
								value={value?.address}
								handleChange={handleChange}
							/>
						)}
						<PhoneInputComponent
							placeholder=''
							value={value.phone}
							handleChange={phone => setValue({ ...value, phone })}
						/>
						<ChangePassword />
						<Text
							onClick={logout}
							cursor='pointer'
							mt='21px'
							textDecoration='underline'
							fontSize='14px'
							fontWeight='400'
							color='#1C1C1C'
							_active={{ opacity: '.7' }}
						>
							Выйти из аккаунта
						</Text>
					</Stack>

					{!!permittedPages && (
						<DefButton
							onClick={onsubmit}
							mt='40px'
							mb='20px'
						>
							Сохранить
						</DefButton>
					)}

					<PinInputModal
						activeStep={activeStep}
						phone={value.phone}
						setActiveStep={setActiveStep}
						isOpen={activeStep === 1}
						onSubmit={onUpdate}
						loading={isPending}
					/>
				</Box>
			</DrawerContent>
		</Drawer>
	)
}

export default Profile
