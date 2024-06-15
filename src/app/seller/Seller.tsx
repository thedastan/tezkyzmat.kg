'use client'

import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import BlackInterface from '@/components/layouts/black-interface'

import { SELLER_PAGES } from '@/config/pages-url.config'

const Seller = () => {
	const { push } = useRouter()
	return (
		<BlackInterface
			buttonFn={() => push(SELLER_PAGES.REQUESTS)}
			buttonText='Посмотреть все заявки'
		>
			<Box></Box>
		</BlackInterface>
	)
}

export default Seller
