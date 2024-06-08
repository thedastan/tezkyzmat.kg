import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

import DefButton from '@/components/ui/buttons/DefButton'
import Description from '@/components/ui/texts/Description'
import TitleComponent from '@/components/ui/texts/TitleComponent'
import UserRoutesFooter from '@/components/ui/texts/UserRoutesFooter'

import {
	MAIN_PADDING,
	STANDARD_BOTTOM_PADDING
} from '@/config/_variables.config'
import { USER_PAGES } from '@/config/pages-url.config'

export default function Home() {
	return (
		<Container px={MAIN_PADDING}>
			<Flex
				flexDirection='column'
				w='100%'
				justifyContent='space-between'
				minH='100vh'
				pb={STANDARD_BOTTOM_PADDING}
			>
				<Flex
					mt='160px'
					flexDirection='column'
					alignItems='center'
					mx='auto'
					textAlign='center'
				>
					<Image
						src='/logo.svg'
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
					<TitleComponent mt='62px'>Все запчасти здесь</TitleComponent>
					<Box maxW='70%'>
						<Description mt='14px'>
							Найдите нужные запчасти для вашего автомобиля
						</Description>
					</Box>
				</Flex>
				<Box>
					<Link href={USER_PAGES.AUTH}>
						<DefButton>Продолжить</DefButton>
					</Link>
					<UserRoutesFooter
						question='Вы продавец?'
						path={USER_PAGES.SIGN_UP}
						action='Создать аккаунт'
					/>
				</Box>
			</Flex>
		</Container>
	)
}
