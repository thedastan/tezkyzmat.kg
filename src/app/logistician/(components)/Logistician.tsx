'use client'

import { Stack, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { LuClock4 } from 'react-icons/lu'

import EmptyOrder from '@/components/empty-component/empty-order'
import BlackInterface from '@/components/layouts/black-interface'
import Spinner from '@/components/loader/spinner'
import TabButton from '@/components/ui/buttons/TabButton'

import { EnumRole } from '@/config/role'

import { useLogistOrder } from '@/hooks/useLogist'

import LogistCard from './LogistCard'

const Logistician = () => {
	const { actual, completed, isLoading } = useLogistOrder()
	const [tabIndex, setTabIndex] = useState(0)
	return (
		<BlackInterface role={EnumRole.LOGISTICIAN}>
			{isLoading && <Spinner />}

			<Tabs
				variant='none'
				onChange={setTabIndex}
				mt='1'
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
						Актуальные
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
				<TabPanels>
					<TabPanel px='0'>
						{!isLoading && !actual?.length && <EmptyOrder />}
						{!!actual?.length && (
							<Stack spacing='10px'>
								{actual?.map(el => (
									<LogistCard
										key={el.id}
										el={el}
									/>
								))}
							</Stack>
						)}
					</TabPanel>
					<TabPanel px='0'>
						{!isLoading && !completed?.length && <EmptyOrder />}
						{!!completed?.length && (
							<Stack spacing='10px'>
								{completed?.map(el => (
									<LogistCard
										key={el.id}
										el={el}
									/>
								))}
							</Stack>
						)}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</BlackInterface>
	)
}

export default Logistician
