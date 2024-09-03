'use client'

import {
	Box,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spinner,
	useDisclosure
} from '@chakra-ui/react'
import moment from 'moment'
import 'moment/locale/ru'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BsWhatsapp } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa6'
import { IoPencil } from 'react-icons/io5'
import { RiEditBoxLine } from 'react-icons/ri'
import { RiWhatsappFill } from 'react-icons/ri'

import Card from '@/components/layouts/card'
import OrderTitles from '@/components/order-items/OrderTitles'
import OrderDetailData from '@/components/order-items/order-detail-data'
import PlacingAnOrder from '@/components/placing-order'

import { poppins } from '@/constants/fonts'

import { AGREED_SELLER_DATA_KEY } from '@/config/_variables.config'
import { CLIENT_PAGES } from '@/config/pages-url.config'

import { useRequestRemove } from '@/hooks/useRequest'

import DeleteModal from '../../modal/DeleteModal'
import Moment from '../../texts/Moment'
import Title from '../../texts/Title'

import {
	EnumOrderStatus,
	ILocaleOrderSeller,
	IOrder,
	OrderSeller
} from '@/models/request.model'

interface RequestCardClientProps {
	order: IOrder
	is_detail?: boolean
}
const RequestCardClient = ({ order, is_detail }: RequestCardClientProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { remove, isPending } = useRequestRemove(onClose)
	const { push } = useRouter()
	const is_found = order.status === EnumOrderStatus.FOUND

	const lastSeen = moment(order.created_at).fromNow()
	return (
		<Card
			display='flex'
			flexDirection='column'
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
				<OrderTitles order={order} />
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
			{!!is_detail && <OrderDetailData order={order} />}
			{order.order_sellers?.map(seller => (
				<SellerWhatsappCard
					seller={seller}
					order_id={order.id}
					key={seller.id}
				/>
			))}
		</Card>
	)
}

interface SellerWhatsappCardProps {
	seller: OrderSeller
	order_id: number
}

function SellerWhatsappCard({ seller, order_id }: SellerWhatsappCardProps) {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [isLoading, setLoading] = useState(false)
	const order_seller: ILocaleOrderSeller = {
		order_id,
		...seller
	}
	const saveSellerData = () => {
		localStorage.setItem(AGREED_SELLER_DATA_KEY, JSON.stringify(order_seller))
	}

	const openPlacing = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			onOpen()
		}, 1200)
	}
	return (
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
			<Menu closeOnSelect={false}>
				<MenuButton as={Box}>
					<Flex
						justifyContent='center'
						alignItems='center'
						bg='#06B2171A'
						rounded='50%'
						w='46px'
						h='46px'
						cursor='pointer'
					>
						<RiWhatsappFill
							color='#06B217'
							fontSize='30px'
						/>
					</Flex>
				</MenuButton>
				<MenuList
					maxW='220px'
					bg='rgba(49, 51, 53, 0.7)'
					p='0'
					border='none'
					rounded='13px'
					overflow='hidden'
					className={poppins.className}
				>
					<Link
						onClick={saveSellerData}
						href={`https://wa.me/${seller.seller_phone}`}
						target='_blank'
					>
						<MenuItem
							h='44px'
							fontWeight='400'
							fontSize='17px'
							lineHeight='22px'
							color='rgba(255, 255, 255, 1)'
							bg='rgba(0, 0, 0, 0.2)'
							w='100%'
							alignItems='center'
							justifyContent='space-between'
							gap='2'
						>
							whatsapp
							<BsWhatsapp />
						</MenuItem>
					</Link>

					<MenuItem
						onClick={openPlacing}
						h='44px'
						fontWeight='400'
						fontSize='17px'
						lineHeight='22px'
						color='rgba(255, 255, 255, 1)'
						bg='rgba(0, 0, 0, 0.2)'
						w='100%'
						alignItems='center'
						justifyContent='space-between'
						gap='2'
					>
						оформить заказ
						{isLoading ? (
							<Spinner
								color='#FFFFFF'
								size='sm'
							/>
						) : (
							<IoPencil />
						)}
					</MenuItem>
				</MenuList>
			</Menu>
			<PlacingAnOrder
				isOpen={isOpen}
				onClose={onClose}
				seller={order_seller}
			/>
		</Flex>
	)
}

export default RequestCardClient
