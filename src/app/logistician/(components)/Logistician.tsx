'use client'

import { Stack } from '@chakra-ui/react'

import BlackInterface from '@/components/layouts/black-interface'
import Title from '@/components/ui/texts/Title'

import LogistCard from './LogistCard'

const Logistician = () => {
	return (
		<BlackInterface buttonText='Завершенные заявки'>
			<Title fontSize='20px'>Актуальные заявки</Title>

			<Stack
				spacing='10px'
				mt='4'
				mb='66px'
			>
				<LogistCard />
				<LogistCard />
			</Stack>
		</BlackInterface>
	)
}

export default Logistician
