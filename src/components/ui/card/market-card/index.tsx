import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { RiWhatsappFill } from 'react-icons/ri'

import Card from '@/components/layouts/card'

import CopyText from '../../texts/CopyText'
import Description from '../../texts/Description'
import Title from '../../texts/Title'

import { IShop } from '@/models/shop.model'

const MarketCard = ({ el }: { el: IShop }) => {
	return (
		<Card
			py='21px'
			mb='10px'
			gap='5'
		>
			<Flex
				justifyContent='space-between'
				gap='3'
			>
				<Flex gap='13px'>
					<Box
						w='64px'
						h='64px'
						rounded='6px'
						overflow='hidden'
					>
						{!!el.images.length && (
							<Image
								src={el.images[0].image}
								alt='Image'
								width={64}
								height={64}
								className='full-image'
							/>
						)}
					</Box>
					<Box py='2'>
						<Title noOfLines={1}>{el.market_name}</Title>
						<Description
							noOfLines={1}
							mt='14px'
							fontSize='14px'
							lineHeight='16px'
							opacity='.5'
						>
							{el.shop}
						</Description>
					</Box>
				</Flex>
				<Link
					href={`https://wa.me/${el.phone}`}
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

			<CopyText
				mt='23px'
				value={el.address}
			/>
		</Card>
	)
}

export default MarketCard
