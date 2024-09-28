import { Flex, IconButton, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

interface PaginationProps {
	setPage: Dispatch<SetStateAction<number>>
	page: number
	count_pages: number
}
const PaginationOrders = ({ page, setPage, count_pages }: PaginationProps) => {
	return count_pages <= 1 ? null : (
		<Flex
			alignItems='center'
			justifyContent='center'
			gap='3'
			my='6'
		>
			<IconButton
				aria-label='prev-button'
				variant='none'
				onClick={() => setPage(state => state - 1)}
				fontSize='26px'
				bg='#f9bd15'
				color='#FFFFFF'
				isDisabled={page === 1}
				_hover={{ bg: '#f9bd15' }}
			>
				<IoIosArrowBack />
			</IconButton>
			<Text>
				{page} / {count_pages}
			</Text>
			<IconButton
				aria-label='prev-button'
				onClick={() => setPage(state => state + 1)}
				fontSize='26px'
				variant='none'
				bg='#f9bd15'
				color='#FFFFFF'
				isDisabled={page === count_pages}
				_hover={{ bg: '#f9bd15' }}
			>
				<IoIosArrowForward />
			</IconButton>
		</Flex>
	)
}

export default PaginationOrders
