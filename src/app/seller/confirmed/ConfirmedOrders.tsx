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
import PaginationOrders from '@/components/ui/buttons/Pagination'
import TabButton from '@/components/ui/buttons/TabButton'
import ConfirmedCardSeller from '@/components/ui/card/confirmed-card-seller'
import EmptyText from '@/components/ui/texts/EmptyText'

import { usePlacedOrders, useWaitingOrders } from '@/hooks/useOrders'

const ConfirmedOrders = () => {
	const [tabIndex, setTabIndex] = useState(0)

	return (
		<Box
			bg='#F4F5F7'
			minH='100vh'
		>
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
							<WaitingOrders />
						</TabPanel>
						<TabPanel px='0'>
							<CompletedOrders />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</Box>
	)
}

function WaitingOrders() {
	const { data, isLoading, count_pages, page, setPage } = useWaitingOrders()
	return (
		<Box>
			{isLoading && <Spinner />}
			{!isLoading && !data?.length && <EmptyText />}
			{data?.map(el => (
				<ConfirmedCardSeller
					key={el.id}
					request={el}
					status_label={el.seller_status_label}
				/>
			))}

			{!isLoading && !!data?.length && (
				<PaginationOrders
					count_pages={count_pages}
					page={page}
					setPage={setPage}
				/>
			)}
		</Box>
	)
}

function CompletedOrders() {
	const { data, isLoading, count_pages, page, setPage } = usePlacedOrders()
	return (
		<Box>
			{isLoading && <Spinner />}
			{!isLoading && !data?.length && <EmptyText />}
			{data?.map(el => (
				<ConfirmedCardSeller
					key={el.id}
					status_label='Завершен'
					request={el}
				/>
			))}
			{!isLoading && !!data?.length && (
				<PaginationOrders
					count_pages={count_pages}
					page={page}
					setPage={setPage}
				/>
			)}
		</Box>
	)
}

export default ConfirmedOrders
