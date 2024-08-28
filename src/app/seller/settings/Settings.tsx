'use client'

import { Box, Container, Flex, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Spinner from '@/components/loader/spinner'
import HeaderComponent from '@/components/navbar/header-component'
import CarModelCard from '@/components/ui/card/car-model-card'
import Description from '@/components/ui/texts/Description'

import EmptySvg from '@/assets/img/empty-model-cars.svg'

import { INTERFACE_WIDTH, NAVBAR_HEIGHT } from '@/config/_variables.config'

import { useSellerSpares } from '@/hooks/useSettings'

import AddBrandButton from './AddBrandButton'

export default function Settings() {
	const { back } = useRouter()
	const { data, isLoading } = useSellerSpares()
	return (
		<Box
			mx='auto'
			bg='#F4F5F7'
			minH='100vh'
			pb={NAVBAR_HEIGHT}
		>
			{isLoading && <Spinner />}
			<Container maxW={INTERFACE_WIDTH}>
				<HeaderComponent
					backFn={back}
					title='Добавить автомобиль'
				/>

				{!isLoading && !data?.length && <EmptyOrder />}

				<Stack
					spacing='10px'
					mt='2'
				>
					{data?.map(el => (
						<CarModelCard
							el={el}
							key={el.id}
						/>
					))}
				</Stack>

				<AddBrandButton />
			</Container>
		</Box>
	)
}

function EmptyOrder() {
	return (
		<Flex
			flexDirection='column'
			alignItems='center'
			textAlign='center'
			gap='33px'
			h='100%'
			justifyContent='center'
			mt='110px'
		>
			<Image
				src={EmptySvg}
				alt='empty'
			/>
			<Description maxW='225px'>
				У вас пока нет добавленных автомобилей
			</Description>
		</Flex>
	)
}
