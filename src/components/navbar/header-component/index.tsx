import { Box, Flex } from '@chakra-ui/react'
import { BsChevronLeft } from 'react-icons/bs'

import TitleComponent from '@/components/ui/texts/TitleComponent'

interface HeaderComponentProps {
	title: string
	backFn: () => void
	color?: string
}
const HeaderComponent = ({
	backFn,
	title,
	color = '#1C1C1C'
}: HeaderComponentProps) => {
	return (
		<Flex
			justifyContent='center'
			alignItems='center'
			position='relative'
			h='75px'
		>
			<Flex
				h='100%'
				flexDirection='column'
				justifyContent='center'
				position='absolute'
				left='0'
				top='0'
			>
				<Box
					onClick={backFn}
					w='30px'
					h='30px'
					cursor='pointer'
				>
					<BsChevronLeft
						fontSize='26px'
						color={color}
					/>
				</Box>
			</Flex>
			<TitleComponent
				fontSize='20px'
				lineHeight='26px'
				color={color}
			>
				{title}
			</TitleComponent>
		</Flex>
	)
}

export default HeaderComponent
