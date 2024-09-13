'use client'

import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

import DefButton from '@/components/ui/buttons/DefButton'
import Description from '@/components/ui/texts/Description'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import LOGO from '@/assets/img/logoIcon.png'

import {
	MAIN_PADDING,
	STANDARD_BOTTOM_PADDING
} from '@/config/_variables.config'
import { USER_PAGES } from '@/config/pages-url.config'
import { EnumRole } from '@/config/role'

import { saveUserRole } from '@/services/role.service'

const HomePage = () => {
	return (
		<Container px={MAIN_PADDING}>
			<Flex
				flexDirection='column'
				w='100%'
				justifyContent='space-between'
				minH='90vh'
				pb={STANDARD_BOTTOM_PADDING}
			>
				<Flex
					mt='110px'
					flexDirection='column'
					alignItems='center'
					mx='auto'
					textAlign='center'
				>
					<Image
						src={LOGO}
						alt='Logo'
						width={83}
						height={83}
					/>
					<Heading
						as='h1'
						mt='10px'
						color='#1C1C1C'
						fontSize='15.68px'
						lineHeight='18.98px'
						fontWeight='700'
					>
						Tez Kyzmat
					</Heading>
					<TitleComponent mt='62px'>Быстрый поиск запчастей</TitleComponent>
					<Box maxW='70%'>
						<Description mt='14px'>
							Найдите нужные запчасти для вашего автомобиля
						</Description>
					</Box>
				</Flex>
				<Box>
					<Link
						href={USER_PAGES.REQUEST}
						onClick={() => saveUserRole(EnumRole.CLIENT)}
					>
						<DefButton>Продолжить</DefButton>
					</Link>

					<Box mt='6'>
						<Flex
							justifyContent='center'
							gap='1'
							mt='1'
						>
							<Box
								onClick={() => saveUserRole(EnumRole.CLIENT)}
								cursor='pointer'
								fontWeight='600'
								fontSize='14px'
								lineHeight='17.5px'
								color='#000000'
							>
								<Link href={USER_PAGES.SIGN_UP}>Создать аккаунт</Link>
							</Box>

							<Description
								fontSize='14px'
								lineHeight='17.5px'
							>
								или
							</Description>
							<Box
								onClick={() => saveUserRole(EnumRole.SELLER)}
								cursor='pointer'
								fontWeight='600'
								fontSize='14px'
								lineHeight='17.5px'
								color='#000000'
							>
								<Link href={USER_PAGES.AUTH}>Войти</Link>
							</Box>
						</Flex>
					</Box>
				</Box>
			</Flex>
		</Container>
	)
}

export default HomePage
