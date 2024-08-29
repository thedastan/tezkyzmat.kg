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
import { CgClose } from 'react-icons/cg'
import { FaCheck } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'

import AddRequestButton from '@/components/add-request-button'
import Spinner from '@/components/loader/spinner'
import HeaderComponent from '@/components/navbar/header-component'
import TabButton from '@/components/ui/buttons/TabButton'
import RequestCardClient from '@/components/ui/card/RequestCardClient'
import Description from '@/components/ui/texts/Description'

import { useRequest } from '@/hooks/useRequest'

import { EnumOrderStatus } from '@/models/request.model'

const ApplicationComponent = () => {
	const [tabIndex, setTabIndex] = useState(0)
	const { data, isLoading } = useRequest()
	return (
		<Box
			bg='#F4F5F7'
			minH='90vh'
		>
			{isLoading && <Spinner />}
			<Container>
				<HeaderComponent title='Заявки' />
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
							Icon={FiSearch}
							isActive={!tabIndex}
							selectedBg='#F9BD15'
						>
							В&nbsp;поиске
						</TabButton>
						<TabButton
							Icon={FaCheck}
							isActive={tabIndex === 1}
							selectedBg='#06B217'
						>
							Найдено
						</TabButton>
						<TabButton
							Icon={CgClose}
							isActive={tabIndex === 2}
							selectedBg='#F17171'
						>
							Не&nbsp;найдено
						</TabButton>
					</TabList>
					<TabPanels pt='8px'>
						<TabPanel px='0'>
							{data
								?.filter(el => el.status === EnumOrderStatus.IN_SEARCH)
								.map(el => (
									<RequestCardClient
										key={el.id}
										order={el}
									/>
								))}

							<Description
								mt='30px'
								textAlign='center'
								maxW='350px'
								mx='auto'
							>
								Через 72 часа ваша заявка будет перемещена во вкладку "не
								найдено"
							</Description>
						</TabPanel>
						<TabPanel px='0'>
							{data
								?.filter(el => el.status === EnumOrderStatus.FOUND)
								.map(el => (
									<RequestCardClient
										key={el.id}
										order={el}
									/>
								))}
						</TabPanel>
						<TabPanel px='0'>
							{data
								?.filter(el => el.status === EnumOrderStatus.NOT_FOUND)
								.map(el => (
									<RequestCardClient
										key={el.id}
										order={el}
									/>
								))}
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
			<AddRequestButton />
		</Box>
	)
}

export default ApplicationComponent
