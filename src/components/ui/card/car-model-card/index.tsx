import { Box, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

import Card from '@/components/layouts/card'

import { SELLER_PAGES } from '@/config/pages-url.config'

import Description from '../../texts/Description'

import { ISettingSpare } from '@/models/spares.model'

const CarModelCard = ({ el }: { el: ISettingSpare }) => {
	return (
		<Link href={SELLER_PAGES.SETTINGS_DETAIL(el.id)}>
			<Card
				py='5'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
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
						{el.brand.brand}
					</Heading>
				</Box>
				<Flex
					justifyContent='space-between'
					alignItems='center'
					gap='4'
				>
					<Heading
						as='h1'
						fontWeight='600'
						fontSize='16px'
						lineHeight='21px'
						letterSpacing='0.5px'
						mt='2'
					>
						{el.model.model}
					</Heading>
					<MdOutlineKeyboardArrowRight
						color='#000000'
						fontSize='20px'
					/>
				</Flex>
			</Card>
		</Link>
	)
}

export default CarModelCard
