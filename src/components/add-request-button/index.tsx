import {
	Container,
	Flex,
	Radio,
	RadioGroup,
	Stack,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'

import {
	INTERFACE_WIDTH,
	LOCALE_REQUEST_KEY,
	LOCALE_REQUEST_LIST_KEY,
	NAVBAR_HEIGHT
} from '@/config/_variables.config'
import { getLocaleStorage, removeLocaleStorage } from '@/config/helpers'
import { CLIENT_PAGES } from '@/config/pages-url.config'

import { useVehicle } from '@/hooks/useVehicle'

import DefButton from '../ui/buttons/DefButton'
import DrawerModal from '../ui/drawer'

import { ILocaleRequest } from '@/models/value-interfaces/request.values'

const AddRequestButton = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [value, setValue] = useState('0')
	const { push } = useRouter()
	const [list, setList] = useState<ILocaleRequest[]>([])

	const onsubmit = () => {
		const ID = +value
		// getLocaleStorage()

		if (!!ID) {
			const local_value: ILocaleRequest = list[ID - 1]

			localStorage.setItem(
				LOCALE_REQUEST_KEY,
				JSON.stringify(local_value as ILocaleRequest)
			)
		}

		push(CLIENT_PAGES.MAIN)
	}

	useEffect(() => {
		const localRequestHistory: ILocaleRequest[] =
			getLocaleStorage(LOCALE_REQUEST_LIST_KEY) || []

		setList(localRequestHistory || [])

		removeLocaleStorage(LOCALE_REQUEST_KEY)
	}, [])

	return (
		<>
			<Flex
				position='fixed'
				bottom={NAVBAR_HEIGHT}
				pb='11px'
				left='0'
				right='0'
			>
				<Container maxW={INTERFACE_WIDTH}>
					<Flex
						onClick={onOpen}
						justifyContent='center'
						alignItems='center'
						w='50px'
						h='50px'
						rounded='50%'
						bg='#F9BD15'
						_active={{ opacity: '.7' }}
						mx='auto'
						cursor='pointer'
					>
						<BsPlusLg
							color='#FFFFFF'
							fontSize='30px'
						/>
					</Flex>
				</Container>
			</Flex>

			<DrawerModal
				isOpen={isOpen}
				onClose={onClose}
				title='Создать заявку'
			>
				<RadioGroup
					value={value}
					onChange={setValue}
				>
					<Stack spacing='4'>
						<Flex
							w='100%'
							h='56px'
							rounded='10px'
							border={`1px solid ${'0' === value ? '#1C1C1C' : '#D8DADC'} `}
						>
							<Radio
								value='0'
								gap='10px'
								w='100%'
								h='100%'
								border='1.5px solid #000000'
								px='4'
								py='18px'
								colorScheme='blackAlpha'
								_focus={{ boxShadow: 'none' }}
								color='#1C1C1C'
							>
								Новая заявка
							</Radio>
						</Flex>

						{list?.map((el, idx) => (
							<RadioCard
								key={idx}
								value={`${idx + 1}`}
								value_state={value}
								el={el}
							/>
						))}
					</Stack>
				</RadioGroup>

				<DefButton
					mt='50px'
					onClick={onsubmit}
				>
					Далее
				</DefButton>
			</DrawerModal>
		</>
	)
}

interface RadioCardProps {
	value: string
	value_state: string
	el: ILocaleRequest
}

function RadioCard({ value, value_state, el }: RadioCardProps) {
	const { data } = useVehicle()
	const brand = data?.find(item => item.id === +el.request.brand)

	return (
		<Flex
			w='100%'
			h='56px'
			rounded='10px'
			border={`1px solid ${value_state === value ? '#1C1C1C' : '#D8DADC'} `}
		>
			<Radio
				value={value}
				gap='10px'
				w='100%'
				h='100%'
				border='1.5px solid #000000'
				px='4'
				py='18px'
				colorScheme='blackAlpha'
				_focus={{ boxShadow: 'none' }}
			>
				<Text
					noOfLines={1}
					fontWeight='600'
					color='#1C1C1C'
				>
					{`${brand?.brand}   “${el.request.description}”`}
				</Text>
			</Radio>
		</Flex>
	)
}

export default AddRequestButton
