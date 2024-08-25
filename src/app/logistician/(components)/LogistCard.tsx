import { Box, Button, Divider, Flex } from '@chakra-ui/react'

import DefButton from '@/components/ui/buttons/DefButton'
import CopyText from '@/components/ui/texts/CopyText'
import Description from '@/components/ui/texts/Description'
import Moment from '@/components/ui/texts/Moment'
import Title from '@/components/ui/texts/Title'

const LogistCard = () => {
	return (
		<Box
			bg='#FFFFFF'
			boxShadow='0px 1px 2px 0px #0000001F'
			rounded='14px'
			px='5'
			py='6'
		>
			<Moment>Сегодня</Moment>
			<Flex
				mt='5'
				justifyContent='space-between'
				alignItems='start'
				gap='3'
			>
				<Box>
					<Title fontWeight='500'>Андрей Продавцов</Title>
					<Title
						mt='3'
						fontWeight='500'
						opacity='.5'
					>
						Андрей Продавцов
					</Title>
				</Box>
				<Box
					bg='#F4F5F7'
					px='6px'
					py='1'
					rounded='6px'
					fontSize='10px'
					lineHeight='16px'
					letterSpacing='0.5px'
					color='#1C1C1C'
				>
					Продавец
				</Box>
			</Flex>
			<CopyText
				mt='4'
				color='#477CF0'
				fontSize='16px'
			>
				ул. Примерная, д. 123, кв. 45
			</CopyText>

			<Divider
				h='1px'
				bg='#000000'
				opacity='.1'
				my='5'
			/>

			<Flex
				mt='5'
				justifyContent='space-between'
				alignItems='start'
				gap='3'
			>
				<Box>
					<Title fontWeight='500'>Асан Усонов</Title>
					<Title
						mt='3'
						fontWeight='500'
						opacity='.5'
					>
						Андрей Продавцов
					</Title>
				</Box>
				<Box
					bg='#F4F5F7'
					px='6px'
					py='1'
					rounded='6px'
					fontSize='10px'
					lineHeight='16px'
					letterSpacing='0.5px'
					color='#1C1C1C'
				>
					Клиент
				</Box>
			</Flex>
			<CopyText
				mt='4'
				color='#477CF0'
				fontSize='16px'
			>
				ул. Черкесский переулок, д. 123, кв. 45
			</CopyText>

			<Divider
				h='1px'
				bg='#000000'
				opacity='.1'
				my='5'
			/>

			<Title>Tayota, Corolla 2015, 1.8L</Title>
			<Description
				lineHeight='16px'
				mt='3'
			>
				“Левая фара”
			</Description>

			<Flex
				gap='14px'
				mt='5'
			>
				<Button
					variant='none'
					w='100%'
					bg='#1C1C1C'
					h='46px'
					rounded='10px'
					color='#FFFFFF'
					fontSize='16px'
					fontWeight='600'
					px='2'
					lineHeight='20px'
					_hover={{ bg: '#1C1C1C' }}
				>
					Забрать
				</Button>
				<Button
					variant='none'
					w='100%'
					bg='#1C1C1C'
					h='46px'
					rounded='10px'
					color='#FFFFFF'
					fontSize='16px'
					fontWeight='600'
					px='2'
					lineHeight='20px'
					isDisabled={true}
					_hover={{ bg: '#1C1C1C' }}
				>
					Отправить
				</Button>
			</Flex>
		</Box>
	)
}

export default LogistCard
