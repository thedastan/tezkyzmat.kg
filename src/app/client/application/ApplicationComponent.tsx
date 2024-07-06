'use client'

import {
	Box,
	Container,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs
} from '@chakra-ui/react'
import { PropsWithChildren, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaCheck } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { IconType } from 'react-icons/lib'

import AddRequestButton from '@/components/add-request-button'
import Spinner from '@/components/loader/spinner'
import HeaderComponent from '@/components/navbar/header-component'
import RequestCardClient from '@/components/ui/card/RequestCardClient'
import Description from '@/components/ui/texts/Description'

import { useRequest } from '@/hooks/useRequest'

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
							{data?.map(el => (
								<RequestCardClient
									key={el.id}
									request={el}
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
							{data?.map(el => (
								<RequestCardClient
									key={el.id}
									request={el}
									is_found={true}
								/>
							))}
						</TabPanel>
						<TabPanel px='0'>
							{data?.map(el => (
								<RequestCardClient
									key={el.id}
									request={el}
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

interface TabButtonProps extends PropsWithChildren {
	selectedBg: string
	isActive: boolean
	Icon: IconType
}
function TabButton({ Icon, isActive, children, selectedBg }: TabButtonProps) {
	return (
		<Tab
			bg='#FFFFFF'
			rounded='10px'
			color='#1C1C1C'
			fontSize='14px'
			fontWeight='400'
			lineHeight='16px'
			px='4'
			py='11px'
			w='30%'
			gap='10px'
			alignItems='center'
			_selected={{
				bg: selectedBg,
				fontWeight: '700',
				color: '#FFFFFF',
				width: '40%'
			}}
		>
			{isActive && (
				<Icon
					color='#FFFFFF'
					fontSize='16px'
				/>
			)}
			{children}
		</Tab>
	)
}

export default ApplicationComponent
