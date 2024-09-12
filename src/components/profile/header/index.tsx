import Profile from '..'
import {
	Avatar,
	Container,
	Flex,
	Heading,
	Stack,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { IoNotificationsOutline } from 'react-icons/io5'

import Spinner from '@/components/loader/spinner'
import ConfirmedRequestButton from '@/components/ui/buttons/ConfirmedRequestButton'

import { SITE_TITLE } from '@/constants/seo.constants'

import Logo from '@/assets/img/light.png'

import {
	INTERFACE_WIDTH,
	PROFILE_HEADER_HEIGHT,
	SELLER_PROFILE_HEADER_HEIGHT
} from '@/config/_variables.config'
import {
	PUBLIC_PAGES,
	SELLER_PAGES,
	USER_PAGES
} from '@/config/pages-url.config'

import { useProfile } from '@/hooks/useProfile'

import Settings from '../settings'

const ProfileHeader = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { push } = useRouter()
	const { data, isLoading } = useProfile()
	const pathname = usePathname()
	const isUserPage = pathname.includes(USER_PAGES.REQUEST)
	const isSellerPage = pathname === SELLER_PAGES.HOME
	return (
		<Flex
			position='fixed'
			zIndex='0'
			top='0'
			left='0'
			right='0'
		>
			{isLoading && <Spinner />}
			<Container
				maxW={INTERFACE_WIDTH}
				bg='#1C1C1C'
				pb='40px'
			>
				<Profile
					isOpen={isOpen}
					onClose={onClose}
				/>

				{isUserPage ? (
					<Flex
					alignItems='center'
					justifyContent='center'
					gap='2'
					cursor='pointer'
					h={PROFILE_HEADER_HEIGHT}
					 // Изменяем направление на колонку
				>
				 {/* Вложенный Flex для первой строки */}
						<Image
							width={45}
							height={45}
							src={Logo}
							alt='Logo'
						/>
							<Flex flexDirection='column' alignItems='start'>
						<Text
							onClick={() => push(PUBLIC_PAGES.HOME)}
							color='#F4F5F7'
							fontWeight='600'
							fontSize='20px'
							variant='none'
							textTransform='uppercase'
							letterSpacing='5'
						>
							Tez Kyzmat 
						</Text>
					</Flex>
				</Flex>
				
					
				) : (
					<Stack
						spacing='26px'
						pt='29px'
						pb='25px'
						h={
							isSellerPage
								? SELLER_PROFILE_HEADER_HEIGHT
								: PROFILE_HEADER_HEIGHT
						}
					>
						<Flex
							justifyContent='space-between'
							alignItems='center'
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
										{data?.profile?.full_name || 'Имя Фамилия'}
									</Heading>
									<Text
										fontWeight='400'
										fontSize='14px'
										lineHeight='18.2px'
										color='#FFFFFF'
										opacity='.5'
									>
										Профиль [{data?.role_label}]
									</Text>
								</Flex>
							</Flex>

							<Flex
								alignItems='center'
								gap='15px'
								color='#F4F5F7'
							>
								<IoNotificationsOutline fontSize='28px' />
								{isSellerPage && <Settings />}
							</Flex>
						</Flex>
						{isSellerPage && <ConfirmedRequestButton />}
					</Stack>
				)}
			</Container>
		</Flex>
	)
}

export default ProfileHeader
