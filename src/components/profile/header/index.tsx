import Profile from '..'
import {
	Avatar,
	Container,
	Flex,
	Heading,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import { IoNotificationsOutline } from 'react-icons/io5'

import HeaderComponent from '@/components/navbar/header-component'

import {
	INTERFACE_WIDTH,
	PROFILE_HEADER_HEIGHT
} from '@/config/_variables.config'

const ProfileHeader = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	return (
		<Flex
			position='fixed'
			zIndex='0'
			top='0'
			left='0'
			right='0'
		>
			<Container
				maxW={INTERFACE_WIDTH}
				bg='#1C1C1C'
				pb='40px'
			>
				<Profile
					isOpen={isOpen}
					onClose={onClose}
				/>
				{isOpen ? (
					<HeaderComponent
						title='Профиль'
						backFn={onClose}
						color='#FFFFFF'
					/>
				) : (
					<Flex
						justifyContent='space-between'
						alignItems='center'
						h={PROFILE_HEADER_HEIGHT}
						pt='29px'
						pb='25px'
					>
						<Flex
							onClick={onOpen}
							cursor='pointer'
							gap='13px'
						>
							<Avatar
								bg='#3D3D3D'
								w='46px'
								h='46px'
							/>
							<Flex
								flexDirection='column'
								justifyContent='space-between'
							>
								<Heading
									as='h1'
									fontWeight='600'
									fontSize='18px'
									lineHeight='23.4px'
									color='#FFFFFF'
								>
									Имя Фамилия
								</Heading>
								<Text
									fontWeight='400'
									fontSize='14px'
									lineHeight='18.2px'
									color='#FFFFFF'
									opacity='.5'
								>
									Профиль
								</Text>
							</Flex>
						</Flex>
						<Flex
							justifyContent='center'
							alignItems='center'
							w='28px'
							h='28px'
							cursor='pointer'
						>
							<IoNotificationsOutline
								fontSize='28px'
								color='#F4F5F7'
							/>
						</Flex>
					</Flex>
				)}
			</Container>
		</Flex>
	)
}

export default ProfileHeader
