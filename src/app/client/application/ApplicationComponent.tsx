'use client'

import {
	Box,
	Container,
	Flex,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaCheck } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'

import AddRequestButton from '@/components/add-request-button'
import Spinner from '@/components/loader/spinner'
import PlacingOrderMain from '@/components/placing-order/PlacingOrderMain'
import TabButton from '@/components/ui/buttons/TabButton'
import RequestCardClient from '@/components/ui/card/RequestCardClient'
import Description from '@/components/ui/texts/Description'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import { CLIENT_PAGES } from '@/config/pages-url.config'

import { useRequest } from '@/hooks/useRequest'

import { EnumOrderStatus } from '@/models/request.model'

const ApplicationComponent = () => {
	const [tabIndex, setTabIndex] = useState(0)
	const { data, isLoading } = useRequest()

	return (
		<Box>
			<PlacingOrderMain />
			{isLoading && <Spinner />}
			<Container pb='50px'>
				<Flex
					h='75px'
					justifyContent='space-between'
					alignItems='center'
				>
					<TitleComponent
						fontSize='20px'
						lineHeight='26px'
						color='#1C1C1C'
					>
						Заявки
					</TitleComponent>
					<Link href={CLIENT_PAGES.HISTORY}>
						<Text
							color='#06B217'
							letterSpacing='.4px'
							lineHeight='26px'
							fontWeight='500'
						>
							История
						</Text>
					</Link>
				</Flex>
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
					<TabPanels pt='2'>
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
