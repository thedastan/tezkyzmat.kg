'use client'

import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import BlackInterface from '@/components/layouts/black-interface'
import DefButton from '@/components/ui/buttons/DefButton'
import Description from '@/components/ui/texts/Description'

import RequestSuccessSvg from '@/assets/img/request-success.svg'

import { ANSWER_LOCAL_KEY, INTERFACE_WIDTH } from '@/config/_variables.config'
import { SELLER_PAGES } from '@/config/pages-url.config'
import { EnumRole } from '@/config/role'

import { EnumOrderStatus } from '@/models/request.model'

export default function RequestSellerSuccessPage() {
	const [status, setStatus] = useState(0)
	const { push } = useRouter()

	useEffect(() => {
		setStatus(JSON.parse(sessionStorage.getItem(ANSWER_LOCAL_KEY) as string))
	}, [])

	return (
		<BlackInterface
			buttonText='На главную'
			buttonFn={() => push(SELLER_PAGES.HOME)}
			role={EnumRole.CLIENT}
		>
			{!!status && (
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
					{(status === EnumOrderStatus.NO ||
						status === EnumOrderStatus.YES) && (
						<Description textAlign='center'>
							{`Вы указали, что запчасть ${status === EnumOrderStatus.NO ? 'нету' : 'есть'} в наличии. Клиент будет уведомлен.`}
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
				<Box
					maxW={INTERFACE_WIDTH}
					w='100%'
					px='4'
				>
					<DefButton
						isTransparent={true}
						onClick={() => push(SELLER_PAGES.CONFIRMED)}
					>
						Подтверждённые заявки
					</DefButton>
				</Box>
			</Flex>
		</BlackInterface>
	)
}
