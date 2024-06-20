'use client'

import {
	Box,
	Container,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FaTrash } from 'react-icons/fa6'

import Spinner from '@/components/loader/spinner'
import HeaderComponent from '@/components/navbar/header-component'

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
					title='Настройки'
				/>

				<TableContainer
					px='0'
					mt='1'
					className='scroll'
					boxShadow='0px 1px 2px 0px #0000001F'
					bg='#FFFFFF'
					rounded='14px'
					py='3'
				>
					<Table size='md'>
						<Thead>
							<Tr>
								<Th>Марка</Th>
								<Th>Модель</Th>
								<Th isNumeric>Годы выпуска</Th>
							</Tr>
						</Thead>
						<Tbody>
							{data?.map(spare => (
								<Tr key={spare.id}>
									<Td>{spare.brand}</Td>
									<Td>{spare.model}</Td>
									<Td isNumeric>{spare.year.join(', ')}</Td>
									<Td
										cursor='pointer'
										_active={{ opacity: '.7' }}
									>
										<FaTrash
											color='#FF877D'
											fontSize='16px'
										/>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>

				<AddBrandButton />
			</Container>
		</Box>
	)
}
