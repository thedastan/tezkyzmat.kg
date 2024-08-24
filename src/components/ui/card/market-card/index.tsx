import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { FiCopy } from 'react-icons/fi'
import { RiWhatsappFill } from 'react-icons/ri'

import Description from '../../texts/Description'
import Title from '../../texts/Title'

const MarketCard = () => {
	return (
		<Box
			flexDirection='column'
			boxShadow='0px 1px 2px 0px #0000001F'
			rounded='14px'
			bg='#FFFFFF'
			px='5'
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
						<Image
							src={''}
							alt='Image'
							width={64}
							height={64}
							className='full-image'
						/>
					</Box>
					<Box py='2'>
						<Title noOfLines={1}>D511-0</Title>
						<Description
							noOfLines={1}
							mt='14px'
							fontSize='14px'
							lineHeight='16px'
							opacity='.5'
						>
							Кербен-Базар
						</Description>
					</Box>
				</Flex>
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
			</Flex>

			<Flex
				alignItems='center'
				justifyContent='space-between'
				mt='23px'
				gap='10px'
			>
				<Text
					noOfLines={1}
					fontWeight='500'
					fontSize='14px'
					lineHeight='16px'
					color='#1C1C1C'
				>
					ул. Черкесский переулок, д. 123, кв. 45
				</Text>

				<Box
					opacity='.5'
					fontSize='20px'
					cursor='pointer'
					_active={{ opacity: '.3' }}
				>
					<FiCopy color='#000000' />
				</Box>
			</Flex>
		</Box>
	)
}

export default MarketCard
