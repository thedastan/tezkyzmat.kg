'use client'

import {
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	useDisclosure
} from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'

import Card from '@/components/layouts/card'
import Spinner from '@/components/loader/spinner'
import HeaderComponent from '@/components/navbar/header-component'
import DeleteModal from '@/components/ui/modal/DeleteModal'
import Description from '@/components/ui/texts/Description'

import { INTERFACE_WIDTH, NAVBAR_HEIGHT } from '@/config/_variables.config'

import { useSellerSpareDetail, useSellerSpareRemove } from '@/hooks/useSettings'

const SettingDetail = ({ id }: { id: string }) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { data, isLoading } = useSellerSpareDetail(id)
	const { remove, isPending } = useSellerSpareRemove()
	if (!data) return null
	return (
		<Box
			mx='auto'
			bg='#F4F5F7'
			minH='100vh'
			pb={NAVBAR_HEIGHT}
		>
			{isLoading && <Spinner />}
			<Container maxW={INTERFACE_WIDTH}>
				<HeaderComponent title='Добавить автомобиль' />

				<Card py='5'>
					<Flex
						justifyContent='space-between'
						alignItems='start'
					>
						<Box>
							<Description
								opacity='.5'
								fontSize='12px'
							>
								Марка
							</Description>
							<Heading
								as='h1'
								fontWeight='600'
								fontSize='16px'
								lineHeight='21px'
								letterSpacing='0.5px'
								mt='2'
							>
								{data.brand.brand}
							</Heading>
						</Box>

						<Box
							_active={{ opacity: '.7' }}
							cursor='pointer'
						>
							<FaTrash
								onClick={onOpen}
								color='#FF9C94'
								fontSize='20px'
							/>
							<DeleteModal
								isOpen={isOpen}
								onClose={onClose}
								onDelete={() => remove(data.id)}
								isLoading={isPending}
							>
								Вы уверены, что хотите удалить заявку?
							</DeleteModal>
						</Box>
					</Flex>

					<Divider
						h='1px'
						bg='#000000'
						my='22px'
						opacity='.1'
					/>

					<Box>
						<Description
							opacity='.5'
							fontSize='12px'
						>
							Модель
						</Description>
						<Description
							fontSize='16px'
							lineHeight='30px'
							mt='2'
						>
							{data.model.model}
						</Description>
					</Box>

					<Divider
						h='1px'
						bg='#000000'
						my='22px'
						opacity='.1'
					/>

					<Box>
						<Description
							opacity='.5'
							fontSize='12px'
						>
							Год
						</Description>
						<Description
							fontSize='16px'
							lineHeight='19.36px'
							mt='2'
						>
							{data.year.map(el => el.year).join(', ')}
						</Description>
					</Box>
				</Card>
			</Container>
		</Box>
	)
}

export default SettingDetail
