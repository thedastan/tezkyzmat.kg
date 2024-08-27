'use client'

import { Stack } from '@chakra-ui/react'

import BlackInterface from '@/components/layouts/black-interface'
import Spinner from '@/components/loader/spinner'
import EmptyText from '@/components/ui/texts/EmptyText'
import Title from '@/components/ui/texts/Title'

import { EnumRole } from '@/config/role'

import { useLogistOrder } from '@/hooks/useLogist'

import LogistCard from './LogistCard'

const Logistician = () => {
	const { data, isLoading } = useLogistOrder()
	return (
		<BlackInterface
			buttonText='Завершенные заявки'
			role={EnumRole.LOGISTICIAN}
		>
			{isLoading && <Spinner />}
			<Title fontSize='20px'>Актуальные заявки</Title>

			{!isLoading && !data?.length && <EmptyText />}
			<Stack
				spacing='10px'
				mt='4'
				mb='66px'
			>
				{data?.map(el => (
					<LogistCard
						key={el.id}
						el={el}
					/>
				))}
			</Stack>
		</BlackInterface>
	)
}

export default Logistician
