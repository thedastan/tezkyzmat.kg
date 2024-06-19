import {
	Box,
	Container,
	Drawer,
	DrawerContent,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useDisclosure
} from '@chakra-ui/react'
import { IoSettingsOutline } from 'react-icons/io5'

import HeaderComponent from '@/components/navbar/header-component'
import DefButton from '@/components/ui/buttons/DefButton'

import { INTERFACE_WIDTH, NAVBAR_HEIGHT } from '@/config/_variables.config'

import AddBrandButton from './AddBrandButton'

const Settings = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	return (
		<>
			<Box
				cursor='pointer'
				onClick={onOpen}
				transform={isOpen ? 'rotate(0)' : 'rotate(-90deg)'}
				transition='.5s'
			>
				<IoSettingsOutline fontSize='27px' />
			</Box>
			<Drawer
				isOpen={isOpen}
				onClose={() => {}}
				placement='bottom'
				size='full'
			>
				<DrawerContent
					w={INTERFACE_WIDTH}
					mx='auto'
					bg='#F4F5F7'
					overflowY='auto'
					className='unscroll'
					pb={NAVBAR_HEIGHT}
				>
					<Container>
						<HeaderComponent
							backFn={onClose}
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
									<Tr>
										<Td>Honda</Td>
										<Td>Accord</Td>
										<Td isNumeric>2016</Td>
									</Tr>
									<Tr>
										<Td>Honda</Td>
										<Td>Fit</Td>
										<Td isNumeric>2014, 2018,2019, 2021</Td>
									</Tr>
									<Tr>
										<Td>Tayota</Td>
										<Td>Camry 75</Td>
										<Td isNumeric>2020-2024</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>

						<AddBrandButton />
					</Container>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default Settings
