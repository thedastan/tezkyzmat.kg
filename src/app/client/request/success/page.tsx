'use client'

import { Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import BlackInterface from '@/components/layouts/black-interface'
import Description from '@/components/ui/texts/Description'

import RequestSuccessSvg from '@/assets/img/request-success.svg'

import { CLIENT_PAGES } from '@/config/pages-url.config'

export default function RequestSuccessPage() {
	const { push } = useRouter()
	return (
		<BlackInterface
			buttonText='Посмотреть'
			buttonFn={() => push(CLIENT_PAGES.APPLICATION)}
		>
			<Flex
				flexDirection='column'
				alignItems='center'
				pt='80px'
				gap='27px'
			>
				<Image
					src={RequestSuccessSvg}
					alt='Image'
				/>
				<Description textAlign='center'>Заявка успешно оформлена!</Description>
			</Flex>
		</BlackInterface>
	)
}
