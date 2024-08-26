'use client'

import { Box, Flex, Stack, useDisclosure } from '@chakra-ui/react'
import moment from 'moment'
import 'moment/locale/ru'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaTrash } from 'react-icons/fa6'
import { RiEditBoxLine } from 'react-icons/ri'
import { RiWhatsappFill } from 'react-icons/ri'

import DefImage from '@/assets/img/file-shadow.svg'

import { CLIENT_PAGES } from '@/config/pages-url.config'

import { useRequestRemove } from '@/hooks/useRequest'

import DeleteModal from '../../modal/DeleteModal'
import Description from '../../texts/Description'
import Moment from '../../texts/Moment'
import Title from '../../texts/Title'

import { EnumOrderStatus, IOrder, IRequest } from '@/models/request.model'
import { condition_order } from '@/models/value-interfaces/request.values'

interface RequestCardClientProps {
	order: IOrder
	is_detail?: boolean
}
const RequestCardClient = ({ order, is_detail }: RequestCardClientProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { remove, isPending } = useRequestRemove(onClose)
	const { push } = useRouter()
	const is_found = order.status === EnumOrderStatus.YES

	const lastSeen = moment(order.created_at).fromNow()
	return (
		<Flex
			flexDirection='column'
			boxShadow='0px 1px 2px 0px #0000001F'
			rounded='14px'
			bg='#FFFFFF'
			px='5'
			py='6'
			mb='10px'
			gap='5'
		>
			<Flex
				alignItems='center'
				justifyContent='space-between'
			>
				<Moment>{lastSeen}</Moment>

				<Flex gap='26px'>
					<Box
						_active={{ opacity: '.7' }}
						cursor='pointer'
					>
						<FaTrash
							onClick={onOpen}
							color='#1C1C1C'
							opacity='.3'
							fontSize='18px'
						/>
						<DeleteModal
							isOpen={isOpen}
							onClose={onClose}
							onDelete={() => remove(order.id)}
							isLoading={isPending}
						>
							Вы уверены, что хотите удалить заявку?
						</DeleteModal>
					</Box>
					{!is_found && (
						<Box
							_active={{ opacity: '.7' }}
							cursor='pointer'
						>
							<RiEditBoxLine
								color='#000000'
								fontSize='20px'
							/>
						</Box>
					)}
				</Flex>
			</Flex>
			<Box
				onClick={() =>
					!is_detail && push(CLIENT_PAGES.APPLICATION_DETAIL(order.id))
				}
				cursor='pointer'
			>
				<Title>{`${order.brand.brand}, ${order.model?.model} ${order.year?.year}, ${!!order.volume ? order.volume + 'L' : ''}`}</Title>
				{!!order.description && (
					<Description mt='12px'>{`“${order.description}”`}</Description>
				)}
			</Box>
			<Flex
				gap='10px'
				overflowX='auto'
				className='unscroll'
			>
				{order.order_images?.map(el => (
					<Image
						key={el.id}
						src={el.image}
						alt='Image'
						width={50}
						height={50}
						objectFit='cover'
						style={{ borderRadius: '6px' }}
					/>
				))}
			</Flex>
			{!!is_detail && (
				<Stack spacing='14px'>
					<Flex
						alignItems='center'
						gap='1'
					>
						<Moment>Производство: </Moment>
						<Title fontWeight='600'>Япония</Title>
					</Flex>
					<Flex
						alignItems='center'
						gap='1'
					>
						<Moment>Тип кузова:</Moment>
						<Title fontWeight='600'>{order.body ? order.body.name : '-'}</Title>
					</Flex>
					<Flex
						alignItems='center'
						gap='1'
					>
						<Moment>Б/У или новый:</Moment>
						<Title fontWeight='600'>
							{!!order.condition && !!condition_order[order.condition]
								? condition_order[order.condition]
								: '-'}
						</Title>
					</Flex>
					<Flex
						alignItems='center'
						gap='1'
					>
						<Moment>Vin-код:</Moment>
						<Title fontWeight='600'>{order.VIN ? order.VIN : '-'}</Title>
					</Flex>
				</Stack>
			)}
			{order.order_sellers?.map(seller => (
				<Flex
					justifyContent='space-between'
					alignItems='center'
				>
					<Flex
						alignItems='center'
						gap='1'
					>
						<Moment>Продавец:</Moment>
						<Title fontWeight='600'>{seller.seller}</Title>
					</Flex>
					<Link
						href={`https://wa.me/${seller.seller_phone}`}
						target='_blank'
					>
						<Flex
							justifyContent='center'
							alignItems='center'
							bg='#06B2171A'
							rounded='50%'
							w='46px'
							h='46px'
						>
							<RiWhatsappFill
								color='#06B217'
								fontSize='30px'
							/>
						</Flex>
					</Link>
				</Flex>
			))}
		</Flex>
	)
}

export default RequestCardClient
