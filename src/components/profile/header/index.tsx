import Profile from '..'
import {
	Avatar,
	Button,
	Container,
	Flex,
	Heading,
	Stack,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { IoNotificationsOutline } from 'react-icons/io5'

import Spinner from '@/components/loader/spinner'
import ConfirmedRequestButton from '@/components/ui/buttons/ConfirmedRequestButton'

import {
	INTERFACE_WIDTH,
	PROFILE_HEADER_HEIGHT,
	SELLER_PROFILE_HEADER_HEIGHT
} from '@/config/_variables.config'
import { SELLER_PAGES, USER_PAGES } from '@/config/pages-url.config'
import { EnumRole } from '@/config/role'

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
						h={PROFILE_HEADER_HEIGHT}
					>
						<Button
							onClick={() => push(USER_PAGES.AUTH(EnumRole.CLIENT))}
							bg='#3D3D3D'
							color='#F4F5F7'
							variant='none'
						>
							Пропустить заявку
						</Button>
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
