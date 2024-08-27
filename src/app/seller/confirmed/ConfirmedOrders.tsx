'use client'

import {
	Box,
	Container,
	TabList,
	TabPanel,
	TabPanels,
	Tabs
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { LuClock4 } from 'react-icons/lu'

import Spinner from '@/components/loader/spinner'
import HeaderComponent from '@/components/navbar/header-component'
import TabButton from '@/components/ui/buttons/TabButton'
import ConfirmedCardSeller from '@/components/ui/card/confirmed-card-seller'
import EmptyText from '@/components/ui/texts/EmptyText'

import { useOrders } from '@/hooks/useOrders'

const ConfirmedOrders = () => {
	const [tabIndex, setTabIndex] = useState(0)
	const { found_orders, pending_orders, isLoading } = useOrders()
	return (
		<Box
			bg='#F4F5F7'
			minH='90vh'
		>
			{isLoading && <Spinner />}
			<Container>
				<HeaderComponent title='Подтверждённые заявки' />
				<Tabs
					variant='none'
					onChange={setTabIndex}
				>
					<TabList
						w='100%'
						gap='2'
						justifyContent='space-between'
						overflowX='auto'
						className='unscroll'
					>
						<TabButton
							Icon={LuClock4}
							isActive={!tabIndex}
							selectedBg='#F9BD15'
							columns={2}
						>
							В ожидании ответа
						</TabButton>
						<TabButton
							Icon={FaCheck}
							isActive={tabIndex === 1}
							selectedBg='#06B217'
							columns={2}
						>
							Завершенные
						</TabButton>
					</TabList>
					<TabPanels pt='8px'>
						<TabPanel px='0'>
							{!found_orders?.length && <EmptyText />}
							{found_orders?.map(el => (
								<ConfirmedCardSeller
									key={el.id}
									request={el}
									status_label='В ожидании'
								/>
							))}
						</TabPanel>
						<TabPanel px='0'>
							{/* {!found_orders?.length && <EmptyText />}
							{found_orders?.map(el => (
								<ConfirmedCardSeller
									key={el.id}
									status_label='Завершен'
									request={el}
								/>
							))} */}

							<EmptyText />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</Box>
	)
}

export default ConfirmedOrders
