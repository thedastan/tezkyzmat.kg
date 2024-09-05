'use client'

import { Container, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import BlackInterface from '@/components/layouts/black-interface'
import DefButton from '@/components/ui/buttons/DefButton'
import Description from '@/components/ui/texts/Description'

import RequestSuccessSvg from '@/assets/img/request-success.svg'

import { ANSWER_LOCAL_KEY, INTERFACE_WIDTH } from '@/config/_variables.config'
import { SELLER_PAGES } from '@/config/pages-url.config'

import { EnumOrderStatus } from '@/models/request.model'

export default function RequestSellerSuccessPage() {
	const [status, setStatus] = useState(0)
	const { push } = useRouter()

	useEffect(() => {
		setStatus(JSON.parse(sessionStorage.getItem(ANSWER_LOCAL_KEY) as string))
	}, [])

	return (
		<BlackInterface>
			{!!status && (
				<Flex
					flexDirection='column'
					alignItems='center'
					pt='60px'
					gap='27px'
				>
					<Image
						src={RequestSuccessSvg}
						alt='Image'
					/>
					{(status === EnumOrderStatus.NOT_FOUND ||
						status === EnumOrderStatus.FOUND) && (
						<Description textAlign='center'>
							{`Вы указали, что запчасть ${status === EnumOrderStatus.NOT_FOUND ? 'нету' : 'есть'} в наличии. Клиент будет уведомлен.`}
						</Description>
					)}
				</Flex>
			)}

			<Flex
				position='fixed'
				bottom='26px'
				left='0'
				w='100%'
				justifyContent='center'
			>
				<Container maxW={INTERFACE_WIDTH}>
					<DefButton onClick={() => push(SELLER_PAGES.HOME)}>
						На главную
					</DefButton>
					<DefButton
						mt='10px'
						isTransparent={true}
						onClick={() => push(SELLER_PAGES.CONFIRMED)}
					>
						Подтверждённые заявки
					</DefButton>
				</Container>
			</Flex>
		</BlackInterface>
	)
}
