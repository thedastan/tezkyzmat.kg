'use client'

import { Box, Heading, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import BlackInterface from '@/components/layouts/black-interface'
import RequestCardSeller from '@/components/ui/card/RequestCardSeller'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import { SELLER_PAGES } from '@/config/pages-url.config'

const Seller = () => {
	const { push } = useRouter()
	return (
		<BlackInterface
			buttonFn={() => push(SELLER_PAGES.REQUESTS)}
			buttonText='Посмотреть все заявки'
		>
			<Box>
				<Heading
					fontWeight='700'
					fontSize='20px'
					lineHeight='16px'
					color='#1C1C1C'
				>
					Недавние
				</Heading>
				<Stack
					spacing='10px'
					mt='4'
				>
					<RequestCardSeller />
				</Stack>
			</Box>
		</BlackInterface>
	)
}

export default Seller
