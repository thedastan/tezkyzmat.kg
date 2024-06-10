import { Flex } from '@chakra-ui/react'
import Image from 'next/image'

import BlackInterface from '@/components/layouts/black-interface'
import Description from '@/components/ui/texts/Description'

import RequestSuccessSvg from '@/assets/img/request-success.svg'

export default function RequestSuccessPage() {
	return (
		<BlackInterface buttonText='Посмотреть'>
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
