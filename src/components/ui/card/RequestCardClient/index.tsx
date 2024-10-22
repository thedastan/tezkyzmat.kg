'use client'

import {
	Box,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spinner,
	Text,
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

import {
	AGREED_SELLER_DATA_KEY,
	LOCALE_REQUEST_KEY
} from '@/config/_variables.config'
import { CLIENT_PAGES } from '@/config/pages-url.config'

import { useRequestRemove } from '@/hooks/useRequest'

import DeleteModal from '../../modal/DeleteModal'
import IdNumber from '../../texts/IdNumber'
import Moment from '../../texts/Moment'
import Title from '../../texts/Title'

import {
	EnumOrderStatus,
	ILocaleOrderSeller,
	IOrder,
	OrderSeller,
	OrderStatusType
} from '@/models/request.model'
import { IRequestForm } from '@/models/value-interfaces/request.values'

interface RequestCardClientProps {
	order: IOrder
	is_detail?: boolean
}
const RequestCardClient = ({ order, is_detail }: RequestCardClientProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { remove, isPending } = useRequestRemove(onClose)
	const { push } = useRouter()

	const onEdit = () => {
		const payload: IRequestForm = {
			id: order.id,
			order_images: order.order_images.map(el => el.image),
			brand: String(order.brand.id),
			description: order.description || '',
			model: order.model?.id ? String(order.model.id) : '',
			volume: order.volume?.id ? String(order.volume?.id) : '',
			year: order.year?.id ? String(order.year?.id) : '',
			body: order.body?.id ? String(order.body?.id) : '',
			country: order.country?.id ? String(order.country?.id) : '',
			VIN: order.VIN || '',
			condition:
				typeof order.condition === 'number' ? String(order.condition) : ''
		}

		localStorage.setItem(LOCALE_REQUEST_KEY, JSON.stringify(payload))
		push(CLIENT_PAGES.MAIN)
	}

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
					{order.status !== EnumOrderStatus.COMPLETED && (
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
					)}
					{order.status === EnumOrderStatus.IN_SEARCH && (
						<Box
							onClick={onEdit}
							_active={{ opacity: '.7' }}
							cursor='pointer'
						>
							<RiEditBoxLine
								color='#000000'
								fontSize='20px'
							/>
						</Box>
					)}

					<IdNumber id={order.id} />
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
					status={order.status}
				/>
			))}
		</Card>
	)
}

interface SellerWhatsappCardProps {
	seller: OrderSeller
	order_id: number
	status: OrderStatusType
}

function SellerWhatsappCard({
	seller,
	order_id,
	status
}: SellerWhatsappCardProps) {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [isLoading, setLoading] = useState(false)
	const order_seller: ILocaleOrderSeller = {
		order_id,
		...seller
	}
	const saveSellerData = () => {
		localStorage.setItem(AGREED_SELLER_DATA_KEY, JSON.stringify(order_seller))
	}

	const WA_link = `https://wa.me/${seller.seller_phone}`

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
			{status === EnumOrderStatus.COMPLETED ? (
				<Link
					href={WA_link}
					target='_blank'
				>
					<WhatsappIcon />
				</Link>
			) : (
				<Menu closeOnSelect={false}>
					<MenuButton as={Box}>
						<WhatsappIcon />
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
							href={WA_link}
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
			)}
			<PlacingAnOrder
				isOpen={isOpen}
				onClose={onClose}
				seller={order_seller}
			/>
		</Flex>
	)
}

function WhatsappIcon() {
	return (
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
	)
}

export default RequestCardClient
