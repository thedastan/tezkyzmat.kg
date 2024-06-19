import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Text,
	Wrap
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa6'
import { FaCheck } from 'react-icons/fa6'
import { LiaTimesSolid } from 'react-icons/lia'

import Imageeee from '@/assets/img/file-shadow.svg'

import { SELLER_PAGES } from '@/config/pages-url.config'

import Moment from '../../texts/Moment'
import Title from '../../texts/Title'

import RequestCardSellerButtons from './buttons'

const RequestCardSeller = () => {
	return (
		<Box
			bg='#FFFFFF'
			rounded='14px'
			boxShadow='0px 1px 2px 0px #0000001F'
			px='5'
			py='6'
		>
			<Link href={SELLER_PAGES.REQUEST_DETAIL(1)}>
				<Flex
					justifyContent='space-between'
					alignItems='center'
				>
					<Moment>Сегодня</Moment>
					<FaChevronRight
						color='#000000'
						fontSize='14px'
					/>
				</Flex>
				<Title
					mt='4'
					noOfLines={1}
				>
					BMW, Golden Awards 2015, 1.8L “Нужна передняя левая фара”
				</Title>
			</Link>
			<Flex
				overflowX='auto'
				mt='5'
				gap='10px'
				className='unscroll'
			>
				{[1, 2, 3, 4].map(el => (
					<Image
						key={el}
						src={Imageeee}
						alt='Image'
						width={50}
						height={50}
						style={{ borderRadius: '6px' }}
					/>
				))}
			</Flex>
			<Divider
				mt='14px'
				h='1px'
				bg='#000000'
				opacity='.1'
			/>
			<RequestCardSellerButtons />
		</Box>
	)
}

export default RequestCardSeller
